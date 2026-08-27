import { useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Check,
  Clock,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Music,
  Play,
  Sparkles,
  Users,
  X,
} from 'lucide-react';

const img = {
  hero: 'https://images.pexels.com/photos/14470108/pexels-photo-14470108.jpeg?auto=compress&cs=tinysrgb&w=1800',
  curtain: 'https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?auto=compress&cs=tinysrgb&w=1400',
  singer: 'https://images.pexels.com/photos/8973779/pexels-photo-8973779.jpeg?auto=compress&cs=tinysrgb&w=1200',
  guitarist: 'https://images.pexels.com/photos/5436281/pexels-photo-5436281.jpeg?auto=compress&cs=tinysrgb&w=1200',
  dj: 'https://images.pexels.com/photos/27595367/pexels-photo-27595367.jpeg?auto=compress&cs=tinysrgb&w=1400',
  crowd: 'https://images.pexels.com/photos/5610120/pexels-photo-5610120.jpeg?auto=compress&cs=tinysrgb&w=1600',
  drink: 'https://images.pexels.com/photos/34519757/pexels-photo-34519757.jpeg?auto=compress&cs=tinysrgb&w=1000',
  drag: 'https://images.pexels.com/photos/4722551/pexels-photo-4722551.jpeg?auto=compress&cs=tinysrgb&w=1400',
  femaleVocal: 'https://images.pexels.com/photos/18532163/pexels-photo-18532163.jpeg?auto=compress&cs=tinysrgb&w=1200',
};

type EventItem = {
  id: string;
  day: string;
  month: string;
  title: string;
  kind: string;
  time: string;
  description: string;
  image: string;
  featured?: boolean;
};

const events: EventItem[] = [
  { id: 'e1', day: '28', month: 'AUG', title: 'Manish Live', kind: 'Live Performance', time: '8:00 PM', description: 'A magnetic live set — intimate vocals, raw energy, and a room that moves as one. The voice you\'ve been waiting for, in a room built for sound.', image: img.singer, featured: true },
  { id: 'e2', day: '30', month: 'AUG', title: 'Persian Night', kind: 'Culture / Music', time: '7:30 PM', description: 'A night of Persian melodies, late-night plates, and golden-hour energy that lingers.', image: img.crowd },
  { id: 'e3', day: '05', month: 'SEP', title: 'Riyaz Band', kind: 'Live Band', time: '9:00 PM', description: 'Big sound, bold arrangements, and the weekend starts the moment they take the stage.', image: img.guitarist },
  { id: 'e4', day: '12', month: 'SEP', title: 'DJ Eve', kind: 'DJ Night', time: '10:00 PM', description: 'A darker, deeper dance floor. Resident DJ Eve behind the decks until close.', image: img.dj },
];

const artists = [
  { name: 'Manish', role: 'Live Vocalist', image: img.singer, number: '01' },
  { name: 'Riyaz Band', role: 'Live Band', image: img.guitarist, number: '02' },
  { name: 'DJ Eve', role: 'Resident DJ', image: img.dj, number: '03' },
  { name: 'Aria', role: 'Guest Vocalist', image: img.femaleVocal, number: '04' },
];

const stats = [
  { value: '500+', label: 'Nights' },
  { value: '50+', label: 'Artists' },
  { value: '4', label: 'Years' },
  { value: '∞', label: 'Memories' },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = bookingOpen || selectedEvent || lightbox ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [bookingOpen, selectedEvent, lightbox]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const openBooking = () => {
    setSelectedEvent(null);
    setBookingOpen(true);
    setSubmitted(false);
  };

  const isVisible = (id: string) => visibleSections.has(id);

  return (
    <div className="site">
      <div className="topline" />

      {/* Navigation */}
      <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <a className="brand" href="#top" aria-label="Studio XO home">
          <span className="brand-mark"><span /></span>
          <span className="brand-text">STUDIO <b>XO</b></span>
        </a>
        <nav className={`nav-menu ${menuOpen ? 'is-open' : ''}`}>
          <button onClick={() => scrollTo('events')}>What's On</button>
          <button onClick={() => scrollTo('experience')}>Experience</button>
          <button onClick={() => scrollTo('artists')}>Artists</button>
          <button onClick={() => scrollTo('private')}>Private Events</button>
          <button onClick={() => scrollTo('gallery')}>Gallery</button>
          <button onClick={() => scrollTo('contact')}>Contact</button>
          <button className="nav-cta-mobile" onClick={openBooking}>Book a Table</button>
        </nav>
        <button className="nav-cta" onClick={openBooking}>Book a Table <ArrowRight size={15} /></button>
        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* Hero */}
      <section className="hero" id="top" ref={heroRef}>
        <div className="hero-bg">
          <img src={img.hero} alt="A packed venue under dramatic red stage lights" />
          <div className="hero-vignette" />
          <div className="hero-grain" />
        </div>
        <div className="hero-inner">
          <div className="hero-left">
            <p className="eyebrow eyebrow--light">Dehradun · India</p>
            <h1 className="hero-title">
              Every night<br />
              <em>has a pulse.</em>
            </h1>
            <p className="hero-sub">
              A cinematic home for live music, late-night energy,<br className="hide-mobile" />
              and the stories you take home with you.
            </p>
            <div className="hero-actions">
              <button className="btn btn--gold" onClick={() => scrollTo('events')}>
                Explore Events <ArrowRight size={16} />
              </button>
              <button className="btn btn--ghost" onClick={openBooking}>
                Reserve a Table
              </button>
            </div>
          </div>
          <div className="hero-card">
            <div className="hero-card-image">
              <img src={img.singer} alt="Featured event: Manish Live" />
              <div className="hero-card-badge">
                <span className="pulse-dot" />
                FEATURED
              </div>
            </div>
            <div className="hero-card-body">
              <div className="hero-card-date">
                <span className="day">28</span>
                <span className="month">AUG</span>
              </div>
              <div className="hero-card-info">
                <p className="kicker">Live Performance</p>
                <h3>Manish Live</h3>
                <p className="hero-card-desc">A magnetic live set — intimate vocals and a room that moves as one.</p>
                <button className="card-link" onClick={() => setSelectedEvent(events[0])}>
                  View details <ArrowUpRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-scroll">
          <span>Scroll</span>
          <ArrowDown size={16} />
        </div>
      </section>

      {/* Marquee */}
      <div className="marquee">
        <div className="marquee-track">
          {Array.from({ length: 4 }).map((_, i) => (
            <div className="marquee-group" key={i}>
              <span>Mystery</span><span className="dot" />
              <span>Melody</span><span className="dot" />
              <span>Magic</span><span className="dot" />
              <span>Live Music</span><span className="dot" />
              <span>Late Nights</span><span className="dot" />
              <span>Studio XO</span><span className="dot" />
            </div>
          ))}
        </div>
      </div>

      {/* Events */}
      <section className="section section--events" id="events" data-reveal>
        <div className="section-head">
          <div>
            <p className="eyebrow">Don't just hear about it</p>
            <h2>What's <em>on</em></h2>
          </div>
          <p className="section-aside">The next chapter is always waiting to be written.</p>
        </div>
        <div className="events-list">
          {events.map((event, i) => (
            <EventRow
              key={event.id}
              event={event}
              index={i}
              visible={isVisible('events')}
              onOpen={() => setSelectedEvent(event)}
              onBook={openBooking}
            />
          ))}
        </div>
      </section>

      {/* Stats Band */}
      <section className="stats-band" data-reveal>
        <div className="stats-inner">
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="experience" id="experience" data-reveal>
        <div className="exp-image">
          <img src={img.curtain} alt="Red velvet curtains and a glowing stage" />
          <div className="exp-image-label">01 / The Room</div>
        </div>
        <div className="exp-copy">
          <p className="eyebrow">More than a venue</p>
          <h2>Enter the<br /><em>XO experience.</em></h2>
          <p className="body-text">
            Studio XO is where the ordinary loses its shape. A little theatrical,
            a little unexpected, and completely yours for the night.
          </p>
          <div className="exp-features">
            <div className="exp-feature"><Music size={18} /><span>Live music & DJ nights</span></div>
            <div className="exp-feature"><Sparkles size={18} /><span>Premium atmosphere</span></div>
            <div className="exp-feature"><Users size={18} /><span>Curated crowds</span></div>
          </div>
        </div>
      </section>

      {/* Artists */}
      <section className="section section--artists" id="artists" data-reveal>
        <div className="section-head">
          <div>
            <p className="eyebrow">The sound of the night</p>
            <h2>Meet the <em>artists.</em></h2>
          </div>
          <p className="section-aside">The faces behind the feeling.</p>
        </div>
        <div className="artists-grid">
          {artists.map((artist, i) => (
            <div
              className="artist-card"
              key={artist.name}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="artist-image">
                <img src={artist.image} alt={`${artist.name}, ${artist.role}`} />
                <span className="artist-number">{artist.number}</span>
                <div className="artist-overlay">
                  <span>View artist <ArrowUpRight size={16} /></span>
                </div>
              </div>
              <div className="artist-meta">
                <h3>{artist.name}</h3>
                <p>{artist.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Private Events */}
      <section className="private" id="private" data-reveal>
        <div className="private-bg">
          <img src={img.drag} alt="A performer under a spotlight on a red curtained stage" />
        </div>
        <div className="private-overlay" />
        <div className="private-content">
          <p className="eyebrow eyebrow--light">Make it yours</p>
          <h2>Make your event<br /><em>an XO experience.</em></h2>
          <p className="body-text">
            Birthdays, brand nights, private celebrations or just a reason to gather.
            We'll make the room feel like it was made for you.
          </p>
          <button className="btn btn--gold" onClick={openBooking}>
            Plan your event <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Gallery */}
      <section className="section section--gallery" id="gallery" data-reveal>
        <div className="section-head">
          <div>
            <p className="eyebrow">A few moments</p>
            <h2>Inside <em>XO.</em></h2>
          </div>
          <p className="section-aside">The night looks better from the inside.</p>
        </div>
        <div className="gallery-grid">
          <button className="gallery-item gallery-item--lg" onClick={() => setLightbox(img.crowd)}>
            <img src={img.crowd} alt="Crowd under laser lights" />
            <span className="gallery-num">01</span>
          </button>
          <button className="gallery-item" onClick={() => setLightbox(img.drink)}>
            <img src={img.drink} alt="A red cocktail" />
            <span className="gallery-num">02</span>
          </button>
          <button className="gallery-item" onClick={() => setLightbox(img.singer)}>
            <img src={img.singer} alt="Singer on stage" />
            <span className="gallery-num">03</span>
          </button>
          <button className="gallery-item gallery-item--wide" onClick={() => setLightbox(img.dj)}>
            <img src={img.dj} alt="DJ performing" />
            <span className="gallery-num">04</span>
          </button>
        </div>
      </section>

      {/* Contact */}
      <section className="contact" id="contact" data-reveal>
        <div className="contact-left">
          <p className="eyebrow">Find your way to us</p>
          <h2>See you<br /><em>at XO.</em></h2>
          <p className="body-text">Come for the moment.<br />Stay for the story.</p>
        </div>
        <div className="contact-right">
          <div className="contact-item">
            <MapPin size={20} />
            <div>
              <b>Studio XO Dehradun</b>
              <span>Rajpur Road, Dehradun<br />Uttarakhand 248001</span>
            </div>
          </div>
          <div className="contact-item">
            <Clock size={20} />
            <div>
              <b>Opening Hours</b>
              <span>Tuesday – Sunday<br />6:00 PM till late</span>
            </div>
          </div>
          <div className="contact-actions">
            <button className="btn btn--dark" onClick={() => window.open('https://maps.google.com/?q=Rajpur+Road+Dehradun', '_blank')}>
              Get directions <ArrowRight size={16} />
            </button>
            <button className="btn btn--outline" onClick={() => window.open('https://wa.me/917895000000', '_blank')}>
              <MessageCircle size={16} /> WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="brand-mark"><span /></span>
            <span>STUDIO <b>XO</b></span>
          </div>
          <p className="footer-tag">Mystery. Melody. Magic.</p>
          <div className="footer-social">
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><Instagram size={18} /></a>
            <a href="https://wa.me/917895000000" target="_blank" rel="noreferrer"><MessageCircle size={18} /></a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 Studio XO. All rights reserved.</span>
          <span>Dehradun, India</span>
        </div>
      </footer>

      {/* Mobile bar */}
      <div className="mobile-bar">
        <button onClick={openBooking}><Calendar size={16} /> Reserve</button>
        <button onClick={openBooking}><Users size={16} /> Book Event</button>
        <a href="https://wa.me/917895000000" target="_blank" rel="noreferrer"><MessageCircle size={16} /> WhatsApp</a>
      </div>

      {/* Modals */}
      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} onBook={openBooking} />
      )}
      {bookingOpen && (
        <BookingModal submitted={submitted} onClose={() => setBookingOpen(false)} onSubmit={() => setSubmitted(true)} />
      )}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close"><X size={24} /></button>
          <img src={lightbox} alt="Expanded Studio XO moment" />
        </div>
      )}
    </div>
  );
}

function EventRow({ event, index, visible, onOpen, onBook }: {
  event: EventItem;
  index: number;
  visible: boolean;
  onOpen: () => void;
  onBook: () => void;
}) {
  const reversed = index % 2 === 1;
  return (
    <article
      className={`event-row ${reversed ? 'event-row--reversed' : ''} ${visible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <button className="event-row-image" onClick={onOpen}>
        <img src={event.image} alt={event.title} />
        <span className="event-row-play"><Play size={18} fill="currentColor" /></span>
        <span className="event-row-kind">{event.kind}</span>
      </button>
      <div className="event-row-body">
        <div className="event-row-date">
          <span className="event-row-day">{event.day}</span>
          <span className="event-row-month">{event.month}</span>
        </div>
        <h3 className="event-row-title">{event.title}</h3>
        <p className="event-row-desc">{event.description}</p>
        <div className="event-row-meta">
          <span><Clock size={15} /> {event.time}</span>
          <span><MapPin size={15} /> Studio XO</span>
        </div>
        <div className="event-row-actions">
          <button className="btn btn--small btn--gold" onClick={onBook}>Book now <ArrowRight size={14} /></button>
          <button className="link-btn" onClick={onOpen}>Details <ArrowUpRight size={15} /></button>
        </div>
      </div>
    </article>
  );
}

function EventModal({ event, onClose, onBook }: { event: EventItem; onClose: () => void; onBook: () => void }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal--event" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={20} /></button>
        <div className="modal-image">
          <img src={event.image} alt={event.title} />
        </div>
        <div className="modal-body">
          <p className="eyebrow">{event.day} {event.month} · Studio XO</p>
          <h2>{event.title}</h2>
          <p className="modal-desc">{event.description} Join us for an unforgettable night of live energy, good company, and the signature XO atmosphere.</p>
          <div className="modal-meta">
            <span><Clock size={16} /> {event.time} onwards</span>
            <span><MapPin size={16} /> Studio XO, Dehradun</span>
          </div>
          <button className="btn btn--gold" onClick={onBook}>Reserve your spot <ArrowRight size={16} /></button>
        </div>
      </div>
    </div>
  );
}

function BookingModal({ submitted, onClose, onSubmit }: { submitted: boolean; onClose: () => void; onSubmit: () => void }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal--booking" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={20} /></button>
        {submitted ? (
          <div className="success">
            <span className="success-icon"><Check size={28} /></span>
            <p className="eyebrow">Thank you</p>
            <h2>Your night<br /><em>starts here.</em></h2>
            <p>We've received your request. The Studio XO team will be in touch shortly to confirm the details.</p>
            <button className="btn btn--dark" onClick={onClose}>Back to XO</button>
          </div>
        ) : (
          <>
            <p className="eyebrow">Book / Reserve / Enquire</p>
            <h2>Make it<br /><em>an XO night.</em></h2>
            <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
              <label>Name<input required placeholder="Your name" /></label>
              <label>Phone<input required type="tel" placeholder="+91 00000 00000" /></label>
              <label>What are you planning?
                <select defaultValue="">
                  <option value="" disabled>Select an option</option>
                  <option>Reserve a table</option>
                  <option>Book an event</option>
                  <option>Plan a private event</option>
                </select>
              </label>
              <label>Message<textarea placeholder="Tell us a little more" rows={3} /></label>
              <button className="btn btn--gold btn--full" type="submit">Send enquiry <ArrowRight size={16} /></button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
