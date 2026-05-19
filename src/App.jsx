import React, { useMemo, useState } from "react";
import {
  CalendarCheck,
  Camera,
  Car,
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
];

const portfolioImages = [
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1200&auto=format&fit=crop",
];

export default function App() {
  const [carType, setCarType] = useState(carTypes[0]);
  const [service, setService] = useState(services[0]);
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  const total = useMemo(() => {
    const addOnTotal = selectedAddOns.reduce(
      (sum, item) => sum + item.price,
      0
    );

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
          {services.map((item) => (
            <div
              key={item.name}
              className="rounded-3xl border border-white/10 bg-neutral-900 p-8 shadow-2xl"
            >
              <Sparkles className="mb-5 h-10 w-10 text-sky-400" />

              <h3 className="text-2xl font-bold">{item.name}</h3>

              <p className="mt-4 text-neutral-400">
                Starting at ${item.price}
              </p>
            </div>
          ))}

          <div className="rounded-3xl border border-white/10 bg-neutral-900 p-8 shadow-2xl">
            <Sparkles className="mb-5 h-10 w-10 text-sky-400" />

            <h3 className="text-2xl font-bold">
              Paint Correction
            </h3>

            <p className="mt-4 text-neutral-400">
              Call for custom quote
            </p>
          </div>
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
                      +${item.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] bg-black p-10 text-white shadow-2xl">
              <CalendarCheck className="mb-6 h-12 w-12 text-sky-400" />

              <h3 className="text-4xl font-black">
                Booking Summary
              </h3>

              <div className="mt-10 space-y-5">
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-neutral-400">
                    Vehicle
                  </span>

                  <span className="font-bold">
                    {carType.name}
                  </span>
                </div>

                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-neutral-400">
                    Service
                  </span>

                  <span className="font-bold">
                    {service.name}
                  </span>
                </div>

                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-neutral-400">
                    Add Ons
                  </span>

                  <span className="font-bold">
                    {selectedAddOns.length}
                  </span>
                </div>
              </div>

              <div className="mt-10 rounded-3xl bg-white/10 p-8">
                <p className="text-neutral-400">
                  Estimated Total
                </p>

                <p className="mt-2 text-6xl font-black text-sky-400">
                  ${total}
                </p>
              </div>

              <button className="mt-10 w-full rounded-full bg-sky-400 px-8 py-5 text-lg font-black text-black transition hover:scale-[1.02]">
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-14 text-center text-5xl font-black">
            Portfolio
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {portfolioImages.map((image, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-[2rem]"
              >
                <img
                  src={image}
                  alt="Detailing"
                  className="h-80 w-full object-cover transition duration-500 hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-neutral-400">
        © 2026 Dior Detailing
      </footer>
    </div>
  );
}
