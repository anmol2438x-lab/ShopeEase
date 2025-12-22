import React, { useState, useEffect } from "react";
import {
  FaRocket,
  FaMedal,
  FaGlobe,
  FaLaughSquint,
  FaShippingFast,
  FaShieldAlt,
  FaHeadset,
  FaExchangeAlt,
  FaRegLaughBeam,
  FaRegLightbulb,
  FaRegStar,
  FaCat,
  FaDog,
  FaPizzaSlice,
  FaGhost,
  FaDragon,
  FaRobot,
  FaSpaceShuttle,
  FaFireAlt,
  FaFlask,
  FaGamepad,
  FaMagic,
  FaCookieBite,
  FaChessKnight,
  FaChartLine,
  FaUsers,
  FaHandshake,
  FaAward,
  FaLightbulb,
  FaBalanceScale,
  FaLeaf,
  FaCodeBranch,
  FaServer,
  FaEye,
  FaHeart,
} from "react-icons/fa";
import {
  FiArrowRight,
  FiZap,
  FiCoffee,
  FiSmile,
  FiFrown,
  FiMeh,
  FiThumbsUp,
  FiThumbsDown,
  FiAward,
  FiAlertTriangle,
  FiDollarSign,
  FiClock,
  FiBarChart2,
  FiPieChart,
} from "react-icons/fi";
import {
  GiEarthAmerica,
  GiThreeFriends,
  GiSunglasses,
  GiRollingDices,
  GiCrystalBall,
  GiNinjaHeroicStance,
  GiPirateFlag,
  GiAlienSkull,
  GiSpaceship,
  GiTreasureMap,
  GiMineTruck,
  GiSwordman,
  GiPistolGun,
  GiBananaPeeled,
  GiSodaCan,
  GiCommercialAirplane,
  GiProcessor,
} from "react-icons/gi";

import { motion } from "framer-motion";

const About = () => {
  const [randomFact, setRandomFact] = useState(
    "Our office WiFi password is 'password123'."
  );

  // 🎲 Random facts generator
  const randomFacts = [
    "Our office WiFi password is 'password123'.",
    "Our CEO once tried to automate his job with a hamster wheel.",
    "We once shipped an empty box to test if customers would notice. (They didn't.)",
    "Our legal team consists of one very tired intern.",
    "Our company mascot is a rubber duck named 'Sir Quacksalot'.",
    "We once held a meeting in VR. Nobody showed up because they forgot their headsets.",
    "Our coffee machine has a higher salary than our interns.",
    "We once rebranded as 'The Company Formerly Known as This Company'.",
    "Our office plants are all fake. Including the cactus.",
    "Our 'AI' is just a guy named Steve in a basement.",
  ];

  useEffect(() => {
    const factInterval = setInterval(() => {
      setRandomFact(
        randomFacts[Math.floor(Math.random() * randomFacts.length)]
      );
    }, 5000);
    return () => clearInterval(factInterval);
  }, []);

  // ========== CONTENT SECTIONS ==========

  // 🎪 Fun "fake" milestones
  const milestones = [
    {
      year: "2018",
      title: "Founded in a Garage",
      desc: "Our MVP was built using expired Red Bull and questionable life choices. We started with a simple vision: to make technology more human and business more fun.",
      icon: <FiCoffee className="text-2xl" />,
      metrics: "3 founders, $5k seed money, 1 coffee machine",
    },
    {
      year: "2019",
      title: "First Major Pivot",
      desc: "After realizing our 'invisible backpack' idea wasn't technically feasible, we pivoted to digital solutions. Our first product was a chatbot that told dad jokes.",
      icon: <GiSunglasses className="text-2xl" />,
      metrics: "12 employees, $1.2M ARR, 10k dad jokes told",
    },
    {
      year: "2020",
      title: "Global Expansion",
      desc: "We went fully remote before it was cool. Our team spread across 8 countries, proving work isn't about where you sit but what you create.",
      icon: <FaGlobe className="text-2xl" />,
      metrics: "45 employees, 8 countries, 100% remote",
    },
    {
      year: "2021",
      title: "Series A Funding",
      desc: "Closed our $15M Series A to scale our platform. Investors loved our unconventional pitch deck that included memes and a rap battle.",
      icon: <FiDollarSign className="text-2xl" />,
      metrics: "$15M raised, 5 new products launched",
    },
    {
      year: "2022",
      title: "AI Platform Launch",
      desc: "Introduced our AI solutions that actually work (most of the time). Featured in TechCrunch as 'The Most Human-Like AI That Still Forgets Your Name'.",
      icon: <FaRobot className="text-2xl" />,
      metrics: "200% YoY growth, 10k+ active users",
    },
    {
      year: "2023",
      title: "Sustainability Commitment",
      desc: "Became carbon neutral and implemented our Green Code initiative to reduce digital environmental impact. Also planted 10,000 trees (virtually).",
      icon: <FaLeaf className="text-2xl" />,
      metrics: "100% carbon neutral, 50% energy reduction",
    },
    {
      year: "2024",
      title: "Global Recognition",
      desc: "Named one of Fast Company's Most Innovative Companies and Fortune's Best Small Workplaces. Our CEO celebrated by getting a tattoo of our logo.",
      icon: <FaAward className="text-2xl" />,
      metrics: "150 employees, $50M ARR, 95% retention",
    },
  ];

  // Team members
  const team = [
    {
      name: "Rahul Kapoor",
      role: "CEO & Chief Visionary",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Serial entrepreneur with 15 years in tech. Believes work should be fun and technology should serve humans, not the other way around.",
      superpower: "Turns complex problems into simple solutions",
      stats: "Founded 3 companies, 2 exits, 1 epic fail",
    },
    {
      name: "Priya Patel",
      role: "CTO & Engineering Lead",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Former Google engineer who values clean code and cleaner jokes. Leads our engineering team with a focus on innovation and maintainability.",
      superpower: "Fixes production issues in her sleep",
      stats: "20+ years experience, 50+ projects shipped",
    },
    {
      name: "Arjun Singh",
      role: "Head of Product",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      bio: "Product visionary who bridges the gap between business needs and technical possibilities. Passionate about user-centered design.",
      superpower: "Knows what users want before they do",
      stats: "10 products launched, 95% success rate",
    },
    {
      name: "Neha Gupta",
      role: "Head of Customer Success",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      bio: "Customer champion who believes support should be proactive, not reactive. Built our customer satisfaction to industry-leading levels.",
      superpower: "Turns angry customers into brand advocates",
      stats: "99% CSAT, 24/7 response time",
    },
    {
      name: "Mr. Whiskers",
      role: "Chief Morale Officer",
      image: "https://placekitten.com/200/200",
      bio: "Rescued from a shelter in 2020, now oversees all employee happiness initiatives. Specializes in keyboard walks and Zoom cameos.",
      superpower: "Unlimited cuteness overload",
      stats: "100% approval rating, 73% outage causation",
    },
  ];

  // 🎤 Client testimonials
  const testimonials = [
    {
      quote:
        "Their platform reduced our operational costs by 40% while improving customer satisfaction. Also, their support team sends the best GIFs.",
      author: "Aditi Sharma, CTO at TechSolutions",
      rating: 5,
      stats: "40% cost reduction, 30% efficiency gain",
    },
    {
      quote:
        "We implemented their solution in record time with minimal disruption. The onboarding was so smooth we thought we were missing something.",
      author: "Vikram Mehta, Director at GlobalCorp",
      rating: 5,
      stats: "75% faster implementation than competitors",
    },
    {
      quote:
        "Their team understands our business better than we do. They've become true partners, not just vendors.",
      author: "Ananya Reddy, CEO at StartupX",
      rating: 5,
      stats: "3 years partnership, 5 joint projects",
    },
    {
      quote:
        "When we hit a scaling issue, they had a solution before we even finished describing the problem. That's the kind of partner you keep.",
      author: "Rohan Desai, Engineering Lead at ScaleFast",
      rating: 5,
      stats: "Handled 10x traffic spike with zero downtime",
    },
  ];

  // 🏆 Awards and recognition
  const awards = [
    {
      title: "Best Workplace for Innovators",
      icon: <FaLightbulb className="text-3xl text-yellow-500" />,
      year: "2024",
      issuer: "Fast Company",
    },
    {
      title: "Top 100 Global Startups",
      icon: <FaGlobe className="text-3xl text-blue-500" />,
      year: "2023",
      issuer: "TechCrunch",
    },
    {
      title: "Excellence in Customer Service",
      icon: <FaHeadset className="text-3xl text-green-500" />,
      year: "2023",
      issuer: "Customer Success Association",
    },
    {
      title: "Most Sustainable Tech Company",
      icon: <FaLeaf className="text-3xl text-emerald-500" />,
      year: "2022",
      issuer: "GreenTech Awards",
    },
    {
      title: "Best Use of AI in Business",
      icon: <FaRobot className="text-3xl text-purple-500" />,
      year: "2022",
      issuer: "AI Business Summit",
    },
  ];

  // 📊 Business metrics
  const metrics = [
    {
      value: "150+",
      label: "Team Members",
      description: "Across 12 countries and 5 continents",
      icon: <FaUsers className="text-4xl" />,
    },
    {
      value: "95%",
      label: "Employee Retention",
      description: "Industry-leading retention rate",
      icon: <FaHandshake className="text-4xl" />,
    },
    {
      value: "10M+",
      label: "Users Served",
      description: "Global customer base",
      icon: <FaChartLine className="text-4xl" />,
    },
    {
      value: "99.9%",
      label: "Uptime",
      description: "Reliability you can count on",
      icon: <FaServer className="text-4xl" />,
    },
  ];

  // 🌍 Global presence
  const locations = [
    {
      city: "San Francisco",
      country: "USA",
      team: "15",
      focus: "Product & Engineering",
      icon: <GiCommercialAirplane className="text-2xl" />,
    },
    {
      city: "Bangalore",
      country: "India",
      team: "45",
      focus: "Engineering & Support",
      icon: <GiProcessor className="text-2xl" />,
    },
    {
      city: "Berlin",
      country: "Germany",
      team: "12",
      focus: "European Operations",
      icon: <FaBalanceScale className="text-2xl" />,
    },
    {
      city: "Singapore",
      country: "Singapore",
      team: "8",
      focus: "Asia-Pacific Growth",
      icon: <FaCodeBranch className="text-2xl" />,
    },
  ];

  return (
    <>
      <div className="bg-white font-sans relative overflow-hidden">
        {/* === 🚀 Hero Section === */}
        <section className="relative py-32 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
          {/* Animated background elements */}
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-20 left-20 w-80 h-80 rounded-full bg-[#d51243] opacity-20 mix-blend-multiply filter blur-3xl"
          ></motion.div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  Serious Solutions. Playful Approach.
                </h1>
                <p className="text-xl text-gray-300 mb-8">
                  We combine cutting-edge technology with human-centric design to deliver exceptional results.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#d51243] hover:bg-rose-700 text-white font-semibold py-3 px-8 rounded-lg flex items-center transition-all shadow-lg hover:shadow-rose-400/30"
                  >
                    Explore Our Solutions <FiArrowRight className="ml-2" />
                  </motion.button>
                  <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold py-3 px-8 rounded-lg transition-all">
                    Meet Our Team
                  </button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Random fact ticker */}
          <div className="absolute bottom-4 left-0 right-0 text-center text-white/70 text-sm">
            <motion.div
              key={randomFact}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              🎲 Fun Fact: {randomFact}
            </motion.div>
          </div>
        </section>

        {/* Rest of the sections remain unchanged... */}
        {/* 🏢 Company Overview */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Who We Are & What We Believe
              </h2>
              <p className="text-xl text-gray-600">
                At our core, we're a technology company that hasn't forgotten
                how to be human.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gray-50 p-8 rounded-xl border border-gray-200"
              >
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mb-6">
                  <FaRegLightbulb className="text-2xl text-[#d51243]" />
                </div>
                <h3 className="text-xl font-bold mb-3">Our Mission</h3>
                <p className="text-gray-600">
                  To create technology that solves real problems while bringing
                  joy to the people who use it. We believe work doesn't have to
                  be boring to be effective.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gray-50 p-8 rounded-xl border border-gray-200"
              >
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mb-6">
                  <FaEye className="text-2xl text-[#d51243]" />
                </div>
                <h3 className="text-xl font-bold mb-3">Our Vision</h3>
                <p className="text-gray-600">
                  A world where technology enhances human connection rather than
                  replacing it. Where businesses thrive by putting people
                  first—both customers and employees.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gray-50 p-8 rounded-xl border border-gray-200"
              >
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mb-6">
                  <FaHeart className="text-2xl text-[#d51243]" />
                </div>
                <h3 className="text-xl font-bold mb-3">Our Values</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Human-first technology</li>
                  <li>• Radical transparency</li>
                  <li>• Sustainable growth</li>
                  <li>• Work-life harmony</li>
                  <li>• Never stop learning</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 📊 Business Metrics */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                By The Numbers
              </h2>
              <p className="text-xl text-gray-600">
                The metrics that matter (and a few that don't but are fun
                anyway)
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-8 rounded-xl shadow-sm text-center"
                >
                  <div className="text-[#d51243] mb-4 flex justify-center">
                    {metric.icon}
                  </div>
                  <p className="text-4xl font-bold text-gray-900 mb-2">
                    {metric.value}
                  </p>
                  <h3 className="text-lg font-semibold mb-2">{metric.label}</h3>
                  <p className="text-gray-500 text-sm">{metric.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 🕰️ Our History */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Journey So Far
              </h2>
              <p className="text-xl text-gray-600">
                From garage startup to global player (with plenty of missteps
                along the way)
              </p>
            </div>

            <div className="mx-auto" style={{ maxWidth: "95%" }}>
              <div className="relative">
                {/* Chaotic timeline line */}
                <div className="absolute left-1/4 md:left-1/3 lg:left-1/2 w-2 h-full bg-gradient-to-b from-red-500 to-blue-500 transform -translate-x-1/2 rotate-3"></div>

                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      x: Math.random() * 500 - 250,
                      rotate: Math.random() * 20 - 10,
                    }}
                    animate={{ opacity: 1, x: 0, rotate: 0 }}
                    transition={{
                      duration: 1,
                      delay: index * 0.3,
                      type: "spring",
                      bounce: 0.5,
                    }}
                    className={`mb-8 md:mb-12 flex flex-col ${
                      index % 3 === 0 ? "md:flex-row-reverse" : "md:flex-row"
                    } items-start`}
                    style={{ marginLeft: `${index * 5}px` }}
                  >
                    {/* Year - Random placement */}
                    <div
                      className={`${
                        index % 2 === 0 ? "ml-12" : "mr-12"
                      } mb-2 md:mb-0`}
                    >
                      <h3
                        className="text-3xl font-extrabold"
                        style={{
                          color: `hsl(${index * 60}, 80%, 50%)`,
                          textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                          transform: `rotate(${index % 2 === 0 ? -5 : 5}deg)`,
                        }}
                      >
                        {milestone.year}
                      </h3>
                    </div>

                    {/* Random dot placement */}
                    <div className="relative self-center mx-4 my-6">
                      <div
                        className="w-8 h-8 rounded-full border-4 border-dashed"
                        style={{
                          backgroundColor: `hsl(${index * 90}, 70%, 70%)`,
                          borderColor: `hsl(${index * 90 + 180}, 70%, 50%)`,
                          transform: `scale(${1 + Math.sin(index) * 0.3})`,
                        }}
                      ></div>
                    </div>

                    {/* Chaotic card styling */}
                    <div
                      className={`p-5 rounded-lg shadow-xl ${
                        index % 2 === 0 ? "bg-yellow-100" : "bg-purple-100"
                      }`}
                      style={{
                        border: "3px dotted #333",
                        transform: `skewX(${index % 2 === 0 ? -3 : 3}deg)`,
                        minWidth: `${Math.max(200, 300 - index * 10)}px`,
                      }}
                    >
                      <div className="flex items-center mb-3">
                        <div
                          className="p-3 rounded-full mr-4"
                          style={{
                            backgroundColor: `hsl(${index * 120}, 80%, 80%)`,
                          }}
                        >
                          {milestone.icon}
                        </div>
                        <h3
                          className="text-lg font-bold underline"
                          style={{
                            color: `hsl(${index * 90}, 80%, 30%)`,
                          }}
                        >
                          {milestone.title}
                        </h3>
                      </div>
                      <p
                        className="text-sm mb-3"
                        style={{
                          fontFamily: index % 2 === 0 ? "cursive" : "monospace",
                          lineHeight: "1.8",
                        }}
                      >
                        {milestone.desc}
                      </p>
                      <p
                        className="text-xs italic"
                        style={{
                          backgroundColor: "rgba(0,0,0,0.1)",
                          padding: "3px 6px",
                          borderRadius: "10px",
                          display: "inline-block",
                        }}
                      >
                        <span className="font-black">Metrics:</span>{" "}
                        {milestone.metrics}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 🌍 Global Presence */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Global Team, Local Impact
              </h2>
              <p className="text-xl text-gray-600">
                We're everywhere you need us to be (and a few places we just
                really like)
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {locations.map((location, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-rose-100 rounded-full mr-4">
                      {location.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{location.city}</h3>
                      <p className="text-gray-500">{location.country}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <span className="font-semibold">Team:</span>{" "}
                      {location.team} people
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Focus:</span>{" "}
                      {location.focus}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 👥 Team Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Meet The Humans Behind The Magic
              </h2>
              <p className="text-xl text-gray-600">
                (And one very important feline)
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-200 group relative"
                >
                  <div className="h-64 overflow-hidden relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <div>
                        <p className="text-white mb-2">
                          <span className="font-semibold">Bio:</span>{" "}
                          {member.bio}
                        </p>
                        <p className="text-white/90 text-sm">
                          <span className="font-semibold">Stats:</span>{" "}
                          {member.stats}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div>
                      <h3 className="text-xl font-bold">{member.name}</h3>
                      <p className="text-[#d51243] font-medium">
                        {member.role}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      <span className="font-semibold">Superpower:</span>{" "}
                      {member.superpower}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 🏆 Awards Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Recognition We're Proud Of
              </h2>
              <p className="text-xl text-gray-600">
                The awards that validate our work (and the ones that just make
                us laugh)
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
              {awards.map((award, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all text-center"
                >
                  <div className="flex justify-center mb-4">{award.icon}</div>
                  <h3 className="font-bold mb-2">{award.title}</h3>
                  <p className="text-gray-500 mb-1">{award.issuer}</p>
                  <p className="text-sm text-gray-400">{award.year}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 🎤 Testimonials */}
        <section className="py-20 bg-rose-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What Our Clients Say
              </h2>
              <p className="text-xl text-gray-600">
                Don't take our word for it—here's what our partners think
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-200 relative"
                >
                  <div className="absolute top-6 right-6 flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaRegStar key={i} className="text-[#d51243] ml-1" />
                    ))}
                  </div>
                  <FaRegLaughBeam className="text-[#d51243] text-3xl mb-4" />
                  <p className="text-lg italic mb-6">"{testimonial.quote}"</p>
                  <div className="border-t border-gray-100 pt-4">
                    <p className="font-semibold text-gray-900">
                      — {testimonial.author}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {testimonial.stats}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 🌱 Sustainability */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center max-w-6xl mx-auto">
              <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Committed to a Better Future
                </h2>
                <p className="text-xl text-gray-600 mb-6">
                  We believe technology should solve problems without creating
                  new ones. That's why sustainability is at the heart of
                  everything we do.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="p-2 bg-rose-100 rounded-full mr-4 mt-1">
                      <FaLeaf className="text-[#d51243]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">
                        Carbon Neutral Operations
                      </h3>
                      <p className="text-gray-600">
                        We've offset 100% of our carbon emissions since 2022
                        through verified projects and renewable energy
                        investments.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="p-2 bg-rose-100 rounded-full mr-4 mt-1">
                      <FaCodeBranch className="text-[#d51243]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">
                        Green Coding Practices
                      </h3>
                      <p className="text-gray-600">
                        Our engineering team follows sustainable coding
                        principles to reduce energy consumption in our products
                        by up to 40%.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="p-2 bg-rose-100 rounded-full mr-4 mt-1">
                      <FaHandshake className="text-[#d51243]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">
                        Ethical Supply Chain
                      </h3>
                      <p className="text-gray-600">
                        We audit all partners to ensure fair labor practices and
                        environmental responsibility throughout our supply
                        chain.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2 bg-gray-50 rounded-xl p-8 border border-gray-200">
                <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                  <h3 className="text-xl font-bold mb-4 text-[#d51243]">
                    Our Sustainability Impact
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Carbon Neutrality</span>
                        <span>100%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-green-500 h-2.5 rounded-full"
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Energy Reduction</span>
                        <span>50%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-500 h-2.5 rounded-full"
                          style={{ width: "50%" }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Waste Diversion</span>
                        <span>85%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-yellow-500 h-2.5 rounded-full"
                          style={{ width: "85%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold mb-4 text-[#d51243]">
                    Sustainability Goals for 2025
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-rose-100 p-1 rounded-full mr-3 mt-1">
                        <FiArrowRight className="text-[#d51243] text-xs" />
                      </div>
                      <span>100% renewable energy for all data centers</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-rose-100 p-1 rounded-full mr-3 mt-1">
                        <FiArrowRight className="text-[#d51243] text-xs" />
                      </div>
                      <span>Zero single-use plastics in operations</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-rose-100 p-1 rounded-full mr-3 mt-1">
                        <FiArrowRight className="text-[#d51243] text-xs" />
                      </div>
                      <span>
                        Plant 100,000 trees through reforestation programs
                      </span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-rose-100 p-1 rounded-full mr-3 mt-1">
                        <FiArrowRight className="text-[#d51243] text-xs" />
                      </div>
                      <span>
                        Launch sustainability certification for all products
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;