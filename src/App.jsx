import React, { useMemo, useState } from "react";
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
    <div className="min-h-screen bg-black text-white">
      <section className="px-6 py-20 text-center">
        <h1 className="text-6xl font-black text-sky-400">
          Dior Detailing
        </h1>

        <p className="mt-4 text-xl text-neutral-300">
          Luxury Auto Detailing • Est. 2022
        </p>

        <div className="mt-10 flex justify-center">
          <a
            href="tel:8453766000"
            className="rounded-full bg-sky-400 px-8 py-4 font-bold text-black"
          >
            <Phone className="mr-2 inline h-5 w-5" />
            (845) 376-6000
          </a>
        </div>
      </section>

      <section className="px-6 py-20">
        <h2 className="mb-10 text-center text-4xl font-black">
          Our Services
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((item) => (
            <div
              key={item.name}
              className="rounded-3xl border border-white/10 bg-neutral-900 p-6"
            >
              <Sparkles className="mb-4 h-8 w-8 text-sky-400" />
              <h3 className="text-2xl font-bold">{item.name}</h3>
              <p className="mt-3 text-neutral-400">
                Starting at ${item.price}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-20 text-black">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-10 text-center text-4xl font-black">
            Booking System
          </h2>

          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="mb-4 text-2xl font-bold">
                Choose Vehicle
              </h3>

              <div className="grid gap-4">
                {carTypes.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setCarType(item)}
                    className={`rounded-2xl border p-5 text-left ${
                      carType.name === item.name
                        ? "border-sky-500 bg-sky-100"
                        : "border-neutral-300"
                    }`}
                  >
                    <Car className="mb-2 h-6 w-6" />

                    <div className="font-bold">{item.name}</div>

                    <div className="text-sm text-neutral-500">
                      {item.extra ? `+$${item.extra}` : "No extra charge"}
                    </div>
                  </button>
                ))}
              </div>

              <h3 className="mb-4 mt-10 text-2xl font-bold">
                Choose Service
              </h3>

              <div className="grid gap-4">
                {services.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setService(item)}
                    className={`rounded-2xl border p-5 text-left ${
                      service.name === item.name
                        ? "border-sky-500 bg-sky-100"
                        : "border-neutral-300"
                    }`}
                  >
                    <div className="font-bold">{item.name}</div>

                    <div className="text-sm text-neutral-500">
                      Starting at ${item.price}
                    </div>
                  </button>
                ))}
              </div>

              <h3 className="mb-4 mt-10 text-2xl font-bold">
                Add Ons
              </h3>

              <div className="grid gap-4">
                {addOns.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => toggleAddOn(item)}
                    className="flex items-center justify-between rounded-2xl border border-neutral-300 p-5"
                  >
                    <span>{item.name}</span>

                    <span>+${item.price}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-black p-8 text-white">
              <CalendarCheck className="mb-5 h-10 w-10 text-sky-400" />

              <h3 className="text-3xl font-black">
                Booking Summary
              </h3>

              <div className="mt-8 space-y-4">
                <div className="flex justify-between">
                  <span>Vehicle</span>
                  <span>{carType.name}</span>
                </div>

                <div className="flex justify-between">
                  <span>Service</span>
                  <span>{service.name}</span>
                </div>

                <div className="flex justify-between">
                  <span>Add-ons</span>
                  <span>{selectedAddOns.length}</span>
                </div>
              </div>

              <div className="mt-10 rounded-2xl bg-white/10 p-6">
                <p className="text-neutral-400">
                  Estimated Total
                </p>

                <p className="text-5xl font-black text-sky-400">
                  ${total}
                </p>
              </div>

              <button className="mt-8 w-full rounded-full bg-sky-400 px-8 py-4 font-bold text-black">
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-neutral-400">
        © 2026 Dior Detailing
      </footer>
    </div>
  );
}
