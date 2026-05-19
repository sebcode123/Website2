import React, { useMemo, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  CalendarCheck,
  Car,
  CheckCircle,
  Phone,
  Sparkles,
} from "lucide-react";

import logoImage from "../logo.png";

const SERVICE_ID = "service_j5yqcnh";
const TEMPLATE_ID = "template_knwlh9j";
const PUBLIC_KEY = "MVfw91tGwdLYllhOg";

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
    desc: "Long-lasting paint protection that adds gloss and durability.",
  },
  {
    title: "Wax Application",
    desc: "Premium wax finish that enhances shine and protection.",
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
    const exists = selectedAddOns.find((x) => x.name === item.name);

    if (exists) {
      setSelectedAddOns(
        selectedAddOns.filter((x) => x.name !== item.name)
      );
    } else {
      setSelectedAddOns([...selectedAddOns, item]);
    }
  };

  const handleConfirmBooking = async () => {
    if (
      !customerName ||
      !customerPhone ||
      !customerEmail ||
      !date
    ) {
      alert(
        "Please fill out all required information before booking."
      );
      return;
    }

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          customer_name: customerName,
          customer_phone: customerPhone,
          customer_email: customerEmail,
          vehicle: carType.name,
          service: service.name,
          booking_date: date,
          booking_time: time,
          total: `$${total}`,
          add_ons:
            selectedAddOns.length > 0
              ? selectedAddOns.map((x) => x.name).join(", ")
              : "None",
        },
        PUBLIC_KEY
      );

      setBookingConfirmed(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      alert("Booking failed to send.");
      console.error(error);
    }
  };

  if (bookingConfirmed) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="max-w-2xl w-full bg-neutral-900 border border-sky-400/20 rounded-[40px] p-10 text-center">
          <CheckCircle className="mx-auto text-sky-400 w-20 h-20 mb-6" />

          <h1 className="text-5xl font-black text-white">
            Booking Confirmed
          </h1>

          <p className="text-neutral-300 mt-6 text-lg">
            Thank you, {customerName}. Your booking request has been sent.
          </p>

          <div className="mt-10 text-left bg-black rounded-3xl p-6 border border-white/10">
            <p className="mb-2 text-white">
              <strong>Vehicle:</strong> {carType.name}
            </p>

            <p className="mb-2 text-white">
              <strong>Service:</strong> {service.name}
            </p>

            <p className="mb-2 text-white">
              <strong>Date:</strong> {date}
            </p>

            <p className="mb-2 text-white">
              <strong>Time:</strong> {time}
            </p>

            <p className="mb-2 text-white">
              <strong>Total:</strong> ${total}
            </p>
          </div>

          <button
            onClick={() => setBookingConfirmed(false)}
            className="mt-8 bg-sky-400 text-black font-bold px-8 py-4 rounded-full"
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
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 text-center px-6">
          <img
            src={logoImage}
            alt="Logo"
            className="w-72 mx-auto mb-8 border border-sky-400 shadow-[0_0_40px_rgba(56,189,248,0.5)]"
          />

          <h1 className="text-6xl md:text-8xl font-black">
            Dior Detailing
          </h1>

          <p className="mt-4 text-2xl text-neutral-300">
            Luxury Auto Detailing • Est. 2022
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="tel:8453766000"
              className="bg-sky-400 text-black px-8 py-4 rounded-full font-bold flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>

            <a
              href="https://instagram.com/diordetailinginc"
              target="_blank"
              rel="noreferrer"
              className="bg-white/10 border border-white/20 px-8 py-4 rounded-full font-bold"
            >
              @diordetailinginc
            </a>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <h2 className="text-center text-5xl font-black mb-16">
          Our Services
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {serviceCards.map((item) => (
            <div
              key={item.title}
              className="bg-neutral-900 border border-white/10 rounded-3xl p-8"
            >
              <Sparkles className="text-sky-400 w-10 h-10 mb-4" />

              <h3 className="text-2xl font-bold">
                {item.title}
              </h3>

              <p className="text-neutral-400 mt-4">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-neutral-100 text-black py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-5xl font-black mb-16">
            Booking System
          </h2>

          <div className="grid lg:grid-cols-2 gap-10">
            <div>
              <h3 className="text-2xl font-black mb-6">
                Choose Vehicle
              </h3>

              <div className="space-y-4">
                {carTypes.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setCarType(item)}
                    className={`w-full p-6 rounded-3xl border text-left ${
                      carType.name === item.name
                        ? "border-sky-500 bg-sky-100"
                        : "border-neutral-300 bg-white"
                    }`}
                  >
                    <Car className="mb-3" />

                    <div className="font-bold text-xl">
                      {item.name}
                    </div>

                    <div className="text-neutral-500">
                      {item.extra === 0
                        ? "No extra charge"
                        : `+$${item.extra}`}
                    </div>
                  </button>
                ))}
              </div>

              <h3 className="text-2xl font-black mt-12 mb-6">
                Choose Service
              </h3>

              <div className="space-y-4">
                {services.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setService(item)}
                    className={`w-full p-6 rounded-3xl border text-left ${
                      service.name === item.name
                        ? "border-sky-500 bg-sky-100"
                        : "border-neutral-300 bg-white"
                    }`}
                  >
                    <div className="font-bold text-xl">
                      {item.name}
                    </div>

                    <div className="text-neutral-500">
                      Starting at ${item.price}
                    </div>
                  </button>
                ))}
              </div>

              <h3 className="text-2xl font-black mt-12 mb-6">
                Add Ons
              </h3>

              <div className="space-y-4">
                {addOns.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => toggleAddOn(item)}
                    className="w-full flex justify-between p-6 rounded-3xl border bg-white"
                  >
                    <span>{item.name}</span>

                    <span>
                      {typeof item.price === "number"
                        ? `+$${item.price}`
                        : item.price}
                    </span>
                  </button>
                ))}
              </div>

              <h3 className="text-2xl font-black mt-12 mb-6">
                Choose Date & Time
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="p-5 rounded-2xl border"
                />

                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="p-5 rounded-2xl border"
                >
                  {times.map((timeOption) => (
                    <option key={timeOption}>
                      {timeOption}
                    </option>
                  ))}
                </select>
              </div>

              <h3 className="text-2xl font-black mt-12 mb-6">
                Contact Information
              </h3>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={customerName}
                  onChange={(e) =>
                    setCustomerName(e.target.value)
                  }
                  className="w-full p-5 rounded-2xl border"
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={customerPhone}
                  onChange={(e) =>
                    setCustomerPhone(e.target.value)
                  }
                  className="w-full p-5 rounded-2xl border"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  value={customerEmail}
                  onChange={(e) =>
                    setCustomerEmail(e.target.value)
                  }
                  className="w-full p-5 rounded-2xl border"
                />
              </div>
            </div>

            <div className="bg-black text-white rounded-[40px] p-10">
              <CalendarCheck className="w-12 h-12 text-sky-400 mb-6" />

              <h3 className="text-4xl font-black">
                Booking Summary
              </h3>

              <div className="mt-10 space-y-5">
                <div className="flex justify-between">
                  <span>Vehicle</span>
                  <span>{carType.name}</span>
                </div>

                <div className="flex justify-between">
                  <span>Service</span>
                  <span>{service.name}</span>
                </div>

                <div className="flex justify-between">
                  <span>Date</span>
                  <span>{date || "Not selected"}</span>
                </div>

                <div className="flex justify-between">
                  <span>Time</span>
                  <span>{time}</span>
                </div>
              </div>

              <div className="mt-10 bg-white/10 rounded-3xl p-8">
                <p className="text-neutral-400">
                  Estimated Total
                </p>

                <p className="text-6xl font-black text-sky-400 mt-3">
                  ${total}
                </p>
              </div>

              <button
                onClick={handleConfirmBooking}
                className="w-full mt-10 bg-sky-400 text-black font-black py-5 rounded-full text-lg"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-5xl font-black mb-6">
            Portfolio
          </h2>

          <p className="text-center text-neutral-400 mb-14">
            Luxury detailing transformations.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {portfolioImages.map((image, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-[32px]"
              >
                <img
                  src={image}
                  alt="Detailing"
                  className="w-full h-80 object-cover hover:scale-110 transition duration-500"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <a
              href="https://instagram.com/diordetailinginc"
              target="_blank"
              rel="noreferrer"
              className="bg-sky-400 text-black px-8 py-4 rounded-full font-bold"
            >
              View Instagram
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8 text-center text-neutral-400">
        © 2026 Dior Detailing
      </footer>
    </div>
  );
}
