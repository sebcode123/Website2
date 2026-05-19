import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarCheck,
  Car,
  CheckCircle,
  Clock,
  Droplets,
  Phone,
  Plus,
  ShieldCheck,
  Sparkles,
  Star,
  Camera,
} from "lucide-react";

const backgroundImage =
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop";

const logoImage = "/logo.png";

const services = [
  { name: "Exterior Detail", price: 150 },
  { name: "Interior Detail", price: 150 },
  { name: "Full Detail Package", price: 250 },
];

const carTypes = [
  { name: "Sedan", extra: 0 },
  { name: "Truck", extra: 50 },
  { name: "Van", extra: 100 },
];

const addOns = [
  { name: "Pet Hair Removal", price: 20 },
  { name: "Engine Bay Cleaning", price: 30 },
  { name: "Ceramic Coating", price: 350 },
  { name: "Wax Application", price: 100 },
  { name: "Clay Bar Treatment", price: 75 },
  { name: "Paint Correction", price: "Call for custom quote" },
];

const serviceCards = [
  {
    icon: Car,
    title: "Exterior Detail",
    desc: "Hand wash, foam bath, wheels, tires, trim shine, and glossy finish.",
  },
  {
    icon: Sparkles,
    title: "Interior Detail",
    desc: "Vacuum, steam clean, stain treatment, leather care, and full interior wipe down.",
  },
  {
    icon: ShieldCheck,
    title: "Ceramic Protection",
    desc: "Long-lasting paint protection that adds shine and water resistance.",
  },
  {
    icon: Sparkles,
    title: "Wax Application",
    desc: "Premium wax coating that enhances gloss and protects your paint finish.",
  },
  {
    icon: Droplets,
    title: "Clay Bar Treatment",
    desc: "Removes embedded contaminants from your paint surface for a smooth finish.",
  },
  {
    icon: Droplets,
    title: "Full Detail",
    desc: "Complete inside-and-out transformation with the full Dior touch.",
  },
  {
    icon: ShieldCheck,
    title: "Paint Correction",
    desc: "Professional polishing that removes swirl marks and restores deep paint gloss.",
  },
];

const portfolioImages = [
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1200&auto=format&fit=crop",
];

const times = ["9:00 AM", "10:30 AM", "12:00 PM", "1:30 PM", "3:00 PM", "4:30 PM"];

export default function App() {
  const [carType, setCarType] = useState(carTypes[0]);
  const [service, setService] = useState(services[2]);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState(times[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const total = useMemo(() => {
    const addOnTotal = selectedAddOns.reduce((sum, item) => {
      return sum + (typeof item.price === "number" ? item.price : 0);
    }, 0);

    return service.price + carType.extra + addOnTotal;
  }, [service, carType, selectedAddOns]);

  const toggleAddOn = (item) => {
    setSelectedAddOns((current) => {
      const alreadySelected = current.some((x) => x.name === item.name);
      return alreadySelected
        ? current.filter((x) => x.name !== item.name)
        : [...current, item];
    });
  };

  const confirmBooking = () => {
    setConfirmed(true);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <section className="relative min-h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-neutral-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.24),transparent_35%)]" />

        <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-sky-400/50 bg-black/70 shadow-xl backdrop-blur">
              <img
                src={logoImage}
                alt="Dior Detailing Logo"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="text-2xl font-bold tracking-wide">
              Dior <span className="text-sky-400">Detailing</span>
            </div>
          </div>
          <a
            href="#book"
            className="rounded-full bg-sky-400 px-5 py-2 text-sm font-bold text-black shadow-lg transition hover:bg-sky-300"
          >
            Book Now
          </a>
        </nav>

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 pb-24 pt-14 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="mb-4 inline-flex rounded-full border border-sky-400/40 bg-black/40 px-4 py-2 text-sm text-sky-300 backdrop-blur">
              Luxury Auto Detailing • Est. 2022
            </p>
            <h1 className="text-5xl font-black leading-tight md:text-7xl">
              Make your car look brand new again.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-200">
              Dior Detailing gives your vehicle a showroom-level clean with premium products, careful service, and flawless results.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#book"
                className="rounded-full bg-sky-400 px-8 py-4 text-center font-bold text-black shadow-xl transition hover:bg-sky-300"
              >
                Schedule a Detail
              </a>
              <a
                href="#services"
                className="rounded-full border border-white/20 bg-black/30 px-8 py-4 text-center font-bold text-white backdrop-blur transition hover:bg-white/10"
              >
                View Services
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="rounded-[2rem] border border-sky-300/20 bg-black/50 p-4 shadow-2xl backdrop-blur"
          >
            <div className="relative flex h-[430px] items-end overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-sky-900/60 via-neutral-950 to-black p-8">
              <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border border-sky-400/30 bg-black/40 opacity-40">
                <img
                  src={logoImage}
                  alt="Dior Detailing Logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="relative z-10">
                <div className="mb-4 flex gap-1 text-sky-300">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <h2 className="text-3xl font-bold">Gloss. Protection. Perfection.</h2>
                <p className="mt-3 text-neutral-300">
                  Premium detailing for daily drivers, luxury cars, trucks, and vans.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-sky-400">Our Services</p>
          <h2 className="mt-3 text-4xl font-black md:text-5xl">Detailing that feels expensive.</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {serviceCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-xl transition hover:-translate-y-1 hover:bg-white/[0.07]"
              >
                <div className="mb-5 inline-flex rounded-2xl bg-sky-400 p-3 text-black">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-300">{card.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-sky-400">Portfolio</p>
          <h2 className="mt-3 text-4xl font-black md:text-5xl">Results that speak for themselves.</h2>
          <p className="mt-4 text-neutral-400">Check out some of our recent luxury detailing transformations.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {portfolioImages.map((img) => (
            <div
              key={img}
              className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl"
            >
              <img
                src={img}
                alt="Dior Detailing portfolio example"
                className="h-[320px] w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="https://instagram.com/diordetailinginc"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full border border-sky-400/30 bg-sky-400/10 px-8 py-4 font-bold text-sky-300 transition hover:bg-sky-400 hover:text-black"
          >
            <Camera className="h-5 w-5" /> @diordetailinginc
          </a>
        </div>
      </section>

      <section id="book" className="bg-white px-6 py-20 text-black">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-sky-600">Booking System</p>
            <h2 className="mt-3 text-4xl font-black md:text-5xl">Schedule your detail.</h2>
            <p className="mt-4 text-neutral-600">Choose your vehicle, service, add-ons, date, and time.</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
            <div className="rounded-[2rem] border border-neutral-200 bg-neutral-50 p-6 shadow-xl md:p-8">
              <div className="space-y-8">
                <div>
                  <h3 className="mb-4 text-xl font-black">1. Choose your car</h3>
                  <div className="grid gap-3 md:grid-cols-3">
                    {carTypes.map((item) => (
                      <button
                        type="button"
                        key={item.name}
                        onClick={() => setCarType(item)}
                        className={`rounded-2xl border p-5 text-left transition ${
                          carType.name === item.name
                            ? "border-sky-500 bg-sky-100"
                            : "border-neutral-200 bg-white hover:border-sky-300"
                        }`}
                      >
                        <Car className="mb-3 h-6 w-6" />
                        <div className="font-bold">{item.name}</div>
                        <div className="text-sm text-neutral-500">
                          {item.extra ? `+$${item.extra}` : "No extra charge"}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-xl font-black">2. Choose service</h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    {services.map((item) => (
                      <button
                        type="button"
                        key={item.name}
                        onClick={() => setService(item)}
                        className={`rounded-2xl border p-5 text-left transition ${
                          service.name === item.name
                            ? "border-sky-500 bg-sky-100"
                            : "border-neutral-200 bg-white hover:border-sky-300"
                        }`}
                      >
                        <Sparkles className="mb-3 h-6 w-6" />
                        <div className="font-bold">{item.name}</div>
                        <div className="text-sm text-neutral-500">Starting at ${item.price}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-xl font-black">3. Add-ons</h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    {addOns.map((item) => {
                      const selected = selectedAddOns.some((x) => x.name === item.name);
                      return (
                        <button
                          type="button"
                          key={item.name}
                          onClick={() => toggleAddOn(item)}
                          className={`flex items-center justify-between rounded-2xl border p-4 text-left transition ${
                            selected
                              ? "border-sky-500 bg-sky-100"
                              : "border-neutral-200 bg-white hover:border-sky-300"
                          }`}
                        >
                          <span className="font-semibold">{item.name}</span>
                          <span className="flex items-center gap-2 text-sm font-bold">
                            <Plus className="h-4 w-4" />
                            {typeof item.price === "number" ? `$${item.price}` : item.price}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-xl font-black">4. Pick date and time</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="rounded-2xl border border-neutral-200 bg-white p-4 font-semibold outline-none focus:border-sky-500"
                    />
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="rounded-2xl border border-neutral-200 bg-white p-4 font-semibold outline-none focus:border-sky-500"
                    >
                      {times.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-xl font-black">5. Contact info</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <input
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="rounded-2xl border border-neutral-200 bg-white p-4 font-semibold outline-none focus:border-sky-500"
                    />
                    <input
                      placeholder="Phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="rounded-2xl border border-neutral-200 bg-white p-4 font-semibold outline-none focus:border-sky-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="h-fit rounded-[2rem] bg-neutral-950 p-8 text-white shadow-2xl">
              <CalendarCheck className="mb-5 h-10 w-10 text-sky-400" />
              <h3 className="text-3xl font-black">Booking Summary</h3>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-neutral-400">Vehicle</span>
                  <span>{carType.name}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-neutral-400">Service</span>
                  <span>{service.name}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-neutral-400">Add-ons</span>
                  <span>{selectedAddOns.length ? selectedAddOns.length : "None"}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-neutral-400">Date</span>
                  <span>{date || "Not picked"}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-neutral-400">Time</span>
                  <span>{time}</span>
                </div>
              </div>

              <div className="mt-8 rounded-3xl bg-white/10 p-5">
                <p className="text-neutral-400">Estimated Total</p>
                <p className="text-5xl font-black text-sky-400">${total}+</p>
              </div>

              <button
                type="button"
                onClick={confirmBooking}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-sky-400 px-8 py-4 font-black text-black transition hover:bg-sky-300"
              >
                <Clock className="h-5 w-5" /> Confirm Booking
              </button>

              {confirmed && (
                <div className="mt-5 flex items-start gap-3 rounded-2xl border border-green-400/30 bg-green-400/10 p-4 text-green-200">
                  <CheckCircle className="mt-0.5 h-5 w-5" />
                  <p className="text-sm">
                    Booking request created for {name || "your customer"}. A real site would send this to your email, calendar, or database.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-sky-400/30 bg-gradient-to-br from-sky-400 to-cyan-600 p-10 text-center text-black shadow-2xl md:p-16">
          <h2 className="text-4xl font-black md:text-5xl">Ready for a luxury clean?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-medium">
            Book Dior Detailing today and get your car looking clean, glossy, and protected.
          </p>
          <a
            href="tel:8453766000"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-8 py-4 font-bold text-white transition hover:bg-neutral-800"
          >
            <Phone className="h-5 w-5" /> (845) 376-6000
          </a>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-neutral-400">
        © 2026 Dior Detailing. Luxury auto detailing services.
      </footer>
    </div>
  );
}We need respond yes created link. We already created zip. Need maybe maybe mention delete current repo files and upload zip extracted. Need ensure zip exists. Need zip. Use container zip. Then final link. Need maybe check build? npm unavailable maybe can run npm install? not necessary. Could zip. Also maybe mention I removed stray text. Need maybe create README. zip. Also canmore update? The canvas contains stray instructions appended after code causing invalid if download. Should update textdoc maybe replace with clean code? But user asks check code ready. We should clean canvas? Need canmore single update maybe remove appended 
