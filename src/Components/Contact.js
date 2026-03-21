import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import { Mail, MapPin, FileDown } from "lucide-react";

function Contact({ data }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null); // "sending" | "success" | "error"

  if (!data) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");

    const templateParams = {
      from_name: form.name,
      to_name: "Ntate Thabo Mponya",
      subject: form.subject,
      message_html: form.message,
      from_email: form.email,
    };

    emailjs
      .send(
        "service_ymndnah",
        "template_bwg2p3c",
        templateParams,
        "user_iyyo8AYtN3opeCzdbnjvS"
      )
      .then(() => {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus(null), 5000);
      })
      .catch(() => {
        setStatus("error");
        setTimeout(() => setStatus(null), 5000);
      });
  };

  return (
    <section id="contact" className="py-24 bg-charcoal text-cream">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-sm text-cream/70 mb-12 max-w-xl">
            {data.contactmessage}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Form */}
            <form onSubmit={handleSubmit} className="md:col-span-2 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-transparent border border-cream/20 rounded text-sm text-cream placeholder:text-cream/40 focus:outline-none focus:border-amber transition-colors"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-transparent border border-cream/20 rounded text-sm text-cream placeholder:text-cream/40 focus:outline-none focus:border-amber transition-colors"
                />
              </div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
                value={form.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-transparent border border-cream/20 rounded text-sm text-cream placeholder:text-cream/40 focus:outline-none focus:border-amber transition-colors"
              />
              <textarea
                name="message"
                rows="6"
                placeholder="Your Message"
                required
                value={form.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-transparent border border-cream/20 rounded text-sm text-cream placeholder:text-cream/40 focus:outline-none focus:border-amber transition-colors resize-none"
              />

              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="px-6 py-3 bg-amber text-charcoal text-sm font-medium rounded hover:bg-amber-light transition-colors disabled:opacity-60"
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>

                {status === "success" && (
                  <span className="text-sm text-green-400">
                    Message sent successfully.
                  </span>
                )}
                {status === "error" && (
                  <span className="text-sm text-red-400">
                    Something went wrong. Please try again.
                  </span>
                )}
              </div>
            </form>

            {/* Contact info sidebar */}
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-amber mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs uppercase tracking-widest text-cream/50 mb-1">
                    Email
                  </p>
                  <a
                    href={`mailto:${data.email}`}
                    className="text-sm text-cream hover:text-amber transition-colors"
                  >
                    {data.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-amber mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs uppercase tracking-widest text-cream/50 mb-1">
                    Location
                  </p>
                  <p className="text-sm text-cream">{data.location}</p>
                </div>
              </div>

              {data.resumedownload && (
                <div className="flex items-start gap-3">
                  <FileDown size={18} className="text-amber mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs uppercase tracking-widest text-cream/50 mb-1">
                      Resume
                    </p>
                    <a
                      href={data.resumedownload}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-cream hover:text-amber transition-colors"
                    >
                      Download CV
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
