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

const backgroundImage =
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop";

const SERVICE_ID = "service_j5yqcnh";
const TEMPLATE_ID = "template_knwlh9j";
const PUBLIC_KEY = "MVfw91tGwdLYllhOg";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const addOnText = selectedAddOns.length
    ? selectedAddOns.map((item) => item.name).join(", ")
    : "None";

  const handleConfirmBooking = async () => {
    if (
      !date ||
      !customerName.trim() ||
      !customerPhone.trim() ||
      !customerEmail.trim()
    ) {
      alert(
        "Please choose a date and fill out your full name, phone number, and email before booking."
      );
      return;
    }

    setIsSubmitting(true);

    const templateParams = {
      customer_name: customerName,
      customer_phone: customerPhone,
      customer_email: customerEmail,
      vehicle: carType.name,
      service: service.name,
      add_ons: addOnText,
      booking_date: date,
      booking_time: time,
      total: `$${total}+`,
      message: `
New Dior Detailing Booking

Customer: ${customerName}
Phone: ${customerPhone}
Email: ${customerEmail}

Vehicle: ${carType.name}
Service: ${service.name}
Add Ons: ${addOnText}

Date: ${date}
Time: ${time}

Estimated Total: $${total}+
      `,
    };

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );

      setBookingConfirmed(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error(error);

      alert(
        "Booking email failed to send. Please try again or call Dior Detailing directly."
      );
    } finally {
      setIsSubmitting(false);
    }
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
            Booking Confirmed
          </h1>

          <p className="mt-5 text-lg leading-8 text-neutral-300">
            Thank you, {customerName}. Your booking request has been sent to
            Dior Detailing.
          </p>

          <div className="mt-8 rounded-3xl bg-white/10 p-6 text-left">
            <h2 className="mb-4 text-2xl font-black text-sky-400">
              Booking Summary
            </h2>

            <p><strong>Vehicle:</strong> {carType.name}</p>
            <p><strong>Service:</strong> {service.name}</p>
            <p><strong>Add Ons:</strong> {addOnText}</p>
            <p><strong>Date:</strong> {date}</p>
            <p><strong>Time:</strong> {time}</p>
            <p><strong>Estimated Total:</strong> ${total}+</p>
          </div>

          <div className="mt-8 rounded-3xl border border-sky-400/30 bg-sky-400/10 p-6">
            <p className="text-neutral-200">
              Confirmation details were sent to:
            </p>

            <p className="mt-3 font-bold text-sky-300">
              {customerEmail}
            </p>
          </div>

          <button
            onClick={() => setBookingConfirmed(false)}
            className="mt-8 rounded-full border border-white/20 px-8 py-4 font-bold text-white transition hover:bg-white/10"
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
    </div>
  );
}
