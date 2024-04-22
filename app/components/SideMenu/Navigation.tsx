import * as React from "react";
import { SlClose } from "react-icons/sl";
import { BsGift } from "react-icons/bs";
import { BsCartCheck } from "react-icons/bs";
import { AiOutlineTrophy } from "react-icons/ai";
import { FaRegUserCircle } from "react-icons/fa";
import { AiOutlineArrowRight } from "react-icons/ai";

import { motion } from "framer-motion";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export const Navigation = () => (
  <motion.div
    variants={variants}
    // className="bg-cyan-500 min-h-screen w-96 fixed top-16 right-0 p-2 flex flex-col items-center bg-gray-600/50 backdrop-blur-sm z-50"
  >
    asdada
  </motion.div>
);

const itemIds = [0, 1, 2, 3, 4];
