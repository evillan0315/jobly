"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdApi } from "react-icons/md";
import { SiReact, SiNextdotjs } from "react-icons/si";
import { TbAi, TbBrandOauth } from "react-icons/tb";
import { SkillsComponentData } from "@/lib/components";
import { SkillGroup } from "@/types/models";

interface SkillsProps {
  title: string;
}

const Skills: React.FC<SkillsProps> = ({ title }) => {
  const [formData, setFormData] = useState<SkillGroup>(SkillsComponentData);
  console.log(setFormData);
  const variants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };
  const getIcon = (iconName: string): React.ReactNode | null => {
    switch (iconName) {
      case "SiNextdotjs":
        return <SiNextdotjs />;
      case "SiReact":
        return <SiReact />;

      case "MdApi":
        return <MdApi />;
      case "TbBrandOauth":
        return <TbBrandOauth />;
      case "TbAi":
        return <TbAi />;
      default:
        return null;
    }
  };
  return (
    <section className="skills-section">
      <h2>{title}</h2>
      <AnimatePresence mode="wait">
        <div className="skill-groups">
          {formData.props.map((group, index) => (
            <motion.div
              key={group.title}
              className="skill-group"
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item.name}>
                    {item.icon && (
                      <span className="icon">{getIcon(item.icon)}</span>
                    )}
                    {item.name}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </section>
  );
};

export default Skills;
