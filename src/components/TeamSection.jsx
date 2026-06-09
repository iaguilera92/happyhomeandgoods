import React from "react";
import "./TeamSection.css";
import { motion } from "framer-motion";

function CheckBullet({ color }) {
  return (
    <span className={`ts-bullet ts-bullet-${color}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" className="ts-bulletSvg">
        <path
          d="M6.5 12.5l3.2 3.2L17.8 7.8"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function RoleIcon({ color }) {
  if (color === "blue") {
    return (
      <img className="ts-roleImg" src="/parents-1.png" alt="" aria-hidden="true" />
    );
  }

  if (color === "yellow") {
    return (
      <img className="ts-roleImg" src="/children.png" alt="" aria-hidden="true" />
    );
  }

  return <img className="ts-roleImg" src="/coach.png" alt="" aria-hidden="true" />;
}

function Card({ title, subtitle, items, color, delay = 0 }) {
  return (
    <motion.div
      className={`ts-card ts-card-${color}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
    >
      <div className={`ts-roleBadge ts-roleBadge-${color}`} aria-hidden="true">
        <RoleIcon color={color} />
      </div>
      <h2 className="ts-cardTitle">{title}</h2>
      <p className={`ts-subtitle ts-subtitle-${color}`}>{subtitle}</p>
      <ul className="ts-list">
        {items.map((item, i) => (
          <li className={`ts-li ts-li-${color}`} key={`${color}-${i}`}>
            <CheckBullet color={color} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function TeamSection() {
  return (
    <section className="ts-container" aria-label="A winning team: Parent Child Coach">
      <div className="ts-inner">
        <motion.header
          className="ts-header"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="ts-tagFlagTop" aria-hidden="true">
            <svg viewBox="0 0 24 24" className="ts-flagSvgMini">
              <path d="M6 3v18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M7 4c6 2 8-1 11 1-3 4-5 2-11 4z" fill="currentColor" opacity="0.9" />
              <circle cx="6" cy="3" r="1" fill="currentColor" />
            </svg>
          </div>

          <div className="ts-tagRow" aria-hidden="true">
            <span className="ts-tagLine" />
            <p className="ts-tag">A WINNING TEAM</p>
            <span className="ts-tagLine" />
          </div>
          <h1 className="ts-title">Parent + Child + Coach</h1>
          <p className="ts-description">
            When each role works together, the experience becomes meaningful and real growth begins.
          </p>
        </motion.header>

        <div className="ts-cards">
          <Card title="Parents" subtitle="The Leader & Foundation" color="blue" delay={0} items={["Ensure your child arrives rested, nourished, and ready","Be their main source of support and encouragement","Choose the right coach and learning environment","Provide the appropriate equipment","Set the tone: keeping the experience positive, balanced, and encouraging"]} />
          <Card title="Children" subtitle="The Heart of the Experience" color="yellow" delay={0.14} items={["Have fun and enjoy the process","Stay engaged and open to learning","Try their best without fear of mistakes","Show respect for the game, the coach, and others"]} />
          <Card title="Coaches" subtitle="The Guides of the Journey" color="green" delay={0.28} items={["Respect and align with the parent's role as the leader","Create a safe and engaging environment","Keep sessions fun, focused, and age-appropriate","Promote safety, discipline, and positive habits"]} />
        </div>

      </div>
    </section>
  );
}
