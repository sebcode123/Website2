import React, { useMemo, useState } from "react";
import {
  CalendarCheck,
  Car,
  CheckCircle,
  Phone,
  Sparkles,
} from "lucide-react";
import logoImage from "../logo.png";

const backgroundImage =
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop";

const services = [
  { name: "Exterior Detail", price: 150 },
  { name: "Interior Detail", price: 150 },
  { name: "Full Detail Package", price: 250 },
];

const carTypes = [
  { name: "Sedan", extra: 0 },
  { name: "Truck/SUV", extra: 50 },
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
    title: "Exterior Detail",
    desc: "Deep clean, decontaminate, and protect your exterior to a showroom shine.",
  },
  {
    title: "Interior Detail",
    desc: "Thorough interior cleaning for a fresh, comfortable driving experience.",
  },
  {
    title: "Full Detail Package",
    desc: "The ultimate complete clean for interior, exterior, and everything in between.",
  },
  {
    title: "Ceramic Coating",
    desc: "Long-lasting paint protection that adds gloss, depth, and water resistance.",
  },
  {
    title: "Wax Application",
    desc: "Premium wax finish that enhances shine and adds a protective layer.",
  },
  {
    title: "Paint Correction",
    desc: "Removes swirl marks, light scratches, and restores deep paint gloss.",
  },
  {
    title: "Clay Bar Treatment",
    desc: "Removes embedded contaminants for a smooth, clean paint surface.",
  },
];

const portfolioImages = [
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1200&auto=format&fit=crop",
];

const times = [
  "9:00 AM",
  "10:30 AM",
  "12:00 PM",
  "1:30 PM",
  "3:00 PM",
  "4:30 PM",
];

export default function App() {
  const [carType, setCarType] = useState(carTypes[0]);
  const [service, setService] = useState(services[0]);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState(times[0]);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const total = useMemo(() => {
    const addOnTotal = selectedAddOns.reduce((sum, item) => {
      return sum + (typeof item.price === "number" ? item.price : 0);
    }, 0);

    return service.price + carType.extra + addOnTotal;
  }, [service, carType, selectedAddOns]);

  const toggleAddOn = (item) => {
    setSelectedAddOns((current) => {
      const exists = current.find((x) => x.name === item.name);

      if (exists) {
        return current.filter((x) => x.name !== item.name);
      }

      return [...current, item];
    });
  };

  const bookingDetails = `
New Dior Detailing Booking

Name: ${customerName || "Not provided"}
Phone: ${customerPhone || "Not provided"}
Email: ${customerEmail || "Not provided"}

Vehicle: ${carType.name}
Service: ${service.name}
Add Ons: ${
    selectedAddOns.length
      ? selectedAddOns.map((item) => item.name).join(", ")
      : "None"
  }

Date: ${date || "Not picked"}
Time: ${time}

Estimated Total: $${total}+
`;

  const bookingMessage = encodeURIComponent(bookingDetails);

  const handleConfirmBooking = () => {
    setBookingConfirmed(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (bookingConfirmed) {
    return (
      <div className="min-h-screen bg-black px-6 py-20 text-white">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-sky-400/30 bg-neutral-950 p-8 text-center shadow-2xl md:p-14">
          <img
            src={logoImage}
            alt="Dior Detailing"
            className="mx-auto mb-8 w-56 drop-shadow-[0_0_35px_rgba(56,189,248,0.45)]"
          />

          <CheckCircle className="mx-auto mb-6 h-16 w-16 text-sky-400" />

          <h1 className="text-4xl font-black md:text-6xl">
            Booking Request Confirmed
          </h1>

          <p className="mt-5 text-lg leading-8 text-neutral-300">
            Thank you{customerName ? `, ${customerName}` : ""}. Your Dior
            Detailing booking request has been created.
          </p>

          <div className="mt-8 rounded-3xl bg-white/10 p-6 text-left">
            <h2 className="mb-4 text-2xl font-black text-sky-400">
              Booking Summary
            </h2>

            <p><strong>Vehicle:</strong> {carType.name}</p>
            <p><strong>Service:</strong> {service.name}</p>
            <p>
              <strong>Add Ons:</strong>{" "}
              {selectedAddOns.length
                ? selectedAddOns.map((item) => item.name).join(", ")
                : "None"}
            </p>
            <p><strong>Date:</strong> {date || "Not picked"}</p>
            <p><strong>Time:</strong> {time}</p>
            <p><strong>Estimated Total:</strong> ${total}+</p>
          </div>

          <div className="mt-8 rounded-3xl border border-sky-400/30 bg-sky-400/10 p-6">
            <p className="text-neutral-200">
              A reminder/confirmation will be sent to:
            </p>

            <p className="mt-3 font-bold text-sky-300">
              {customerPhone || "No phone entered"}
            </p>

            <p className="font-bold text-sky-300">
              {customerEmail || "No email entered"}
            </p>

            <p className="mt-4 text-sm text-neutral-400">
              Note: this demo confirms the booking on-screen. Automatic email
              and text reminders require a backend service.
            </p>
          </div>

          <a
            href={`sms:8453766000?body=${bookingMessage}`}
            className="mt-8 block rounded-full bg-sky-400 px-8 py-4 font-black text-black transition hover:scale-[1.02]"
          >
            Text Booking Details to Dior Detailing
          </a>

          <button
            onClick={() => setBookingConfirmed(false)}
            className="mt-4 rounded-full border border-white/20 px-8 py-4 font-bold text-white transition hover:bg-white/10"
          >
            Back to Website
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white">
      <section
        className="relative min-h-screen overflow-hidden"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/75" />

        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <img
            src={logoImage}
            alt="Dior Detailing"
            className="mb-8 w-72 max-w-full drop-shadow-[0_0_40px_rgba(56,189,248,0.55)]"
          />

          <h1 className="text-5xl font-black tracking-tight md:text-7xl">
            Dior Detailing
          </h1>

          <p className="mt-4 text-lg text-neutral-300 md:text-2xl">
            Luxury Auto Detailing • Est. 2022
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="tel:8453766000"
              className="rounded-full bg-sky-400 px-8 py-4 font-bold text-black transition hover:scale-105"
            >
              <Phone className="mr-2 inline h-5 w-5" />
              Call Now
            </a>

            <a
              href="https://instagram.com/diordetailinginc"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 bg-white/10 px-8 py-4 font-bold backdrop-blur transition hover:bg-white/20"
            >
              @diordetailinginc
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <h2 className="mb-14 text-center text-5xl font-black">
          Our Services
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {serviceCards.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-neutral-900 p-8 shadow-2xl"
            >
              <Sparkles className="mb-5 h-10 w-10 text-sky-400" />

              <h3 className="text-2xl font-bold">
                {item.title}
              </h3>

              <p className="mt-4 text-neutral-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-neutral-100 px-6 py-24 text-black">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-14 text-center text-5xl font-black">
            Booking System
          </h2>

          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="mb-5 text-2xl font-black">
                Choose Vehicle
              </h3>

              <div className="grid gap-4">
                {carTypes.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setCarType(item)}
                    className={`rounded-3xl border p-6 text-left transition ${
                      carType.name === item.name
                        ? "border-sky-500 bg-sky-100"
                        : "border-neutral-300 bg-white"
                    }`}
                  >
                    <Car className="mb-3 h-7 w-7" />

                    <div className="text-xl font-bold">
                      {item.name}
                    </div>

                    <div className="mt-1 text-neutral-500">
                      {item.extra
                        ? `+$${item.extra}`
                        : "No extra charge"}
                    </div>
                  </button>
                ))}
              </div>

              <h3 className="mb-5 mt-12 text-2xl font-black">
                Choose Service
              </h3>

              <div className="grid gap-4">
                {services.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setService(item)}
                    className={`rounded-3xl border p-6 text-left transition ${
                      service.name === item.name
                        ? "border-sky-500 bg-sky-100"
                        : "border-neutral-300 bg-white"
                    }`}
                  >
                    <div className="text-xl font-bold">
                      {item.name}
                    </div>

                    <div className="mt-1 text-neutral-500">
                      Starting at ${item.price}
                    </div>
                  </button>
                ))}
              </div>

              <h3 className="mb-5 mt-12 text-2xl font-black">
                Add Ons
              </h3>

              <div className="grid gap-4">
                {addOns.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => toggleAddOn(item)}
                    className="flex items-center justify-between rounded-3xl border border-neutral-300 bg-white p-6 transition hover:border-sky-400"
                  >
                    <span className="font-semibold">
                      {item.name}
                    </span>

                    <span className="font-bold">
                      {typeof item.price === "number"
                        ? `+$${item.price}`
                        : item.price}
                    </span>
                  </button>
                ))}
              </div>

              <h3 className="mb-5 mt-12 text-2xl font-black">
                Choose Date & Time
              </h3>

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="rounded-3xl border border-neutral-300 bg-white p-6 font-semibold"
                />

                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="rounded-3xl border border-neutral-300 bg-white p-6 font-semibold"
                >
                  {times.map((timeOption) => (
                    <option key={timeOption}>
                      {timeOption}
                    </option>
                  ))}
                </select>
              </div>

              <h3 className="mb-5 mt-12 text-2xl font-black">
                Contact Information
              </h3>

              <div className="grid gap-4">
                <input
                  type="text"
                  placeholder="Full name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="rounded-3xl border border-neutral-300 bg-white p-6 font-semibold"
                />

                <input
                  type="tel"
                  placeholder="Phone number"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="rounded-3xl border border-neutral-300 bg-white p-6 font-semibold"
                />

                <input
                  type="email"
                  placeholder="Email address"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="rounded-3xl border border-neutral-300 bg-white p-6 font-semibold"
                />
              </div>
            </div>

            <div className="rounded-[2rem] bg-black p-10 text-white shadow-2xl">
              <CalendarCheck className="mb-6 h-12 w-12 text-sky-400" />

              <h3 className="text-4xl font-black">
                Booking Summary
              </h3>

              <div className="mt-10 space-y-5">
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-neutral-400">Vehicle</span>
                  <span className="font-bold">{carType.name}</span>
                </div>

                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-neutral-400">Service</span>
                  <span className="font-bold">{service.name}</span>
                </div>

                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-neutral-400">Add Ons</span>
                  <span className="font-bold">{selectedAddOns.length}</span>
                </div>

                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-neutral-400">Date</span>
                  <span className="font-bold">{date || "Not picked"}</span>
                </div>

                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-neutral-400">Time</span>
                  <span className="font-bold">{time}</span>
                </div>
              </div>

              <div className="mt-10 rounded-3xl bg-white/10 p-8">
                <p className="text-neutral-400">
                  Estimated Total
                </p>

                <p className="mt-2 text-6xl font-black text-sky-400">
                  ${total}+
                </p>
              </div>

              <button
                onClick={handleConfirmBooking}
                className="mt-10 w-full rounded-full bg-sky-400 px-8 py-5 text-lg font-black text-black transition hover:scale-[1.02]"
              >
                Confirm Booking
              </button>

              <p className="mt-4 text-center text-sm text-neutral-500">
                After confirming, you’ll see your booking confirmation screen.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-6 text-center text-5xl font-black">
            Portfolio
          </h2>

          <p className="mb-14 text-center text-neutral-400">
            Check out our latest detailing work and transformations.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            {portfolioImages.map((image, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-[2rem] border border-white/10"
              >
                <img
                  src={image}
                  alt="Detailing"
                  className="h-80 w-full object-cover transition duration-500 hover:scale-110"
                />
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <a
              href="https://instagram.com/diordetailinginc"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-sky-400 px-8 py-4 font-bold text-black transition hover:scale-105"
            >
              View More on Instagram @diordetailinginc
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-neutral-400">
        © 2026 Dior Detailing
      </footer>
    </div>
  );
}
