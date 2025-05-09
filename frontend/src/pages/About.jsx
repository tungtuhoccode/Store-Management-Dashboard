import React from 'react'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <div>
      {/* Subtle background image */}
      <img
        src="/images/AboutPageWallPaper.avif"
        alt=""
        className="absolute top-0 left-0 w-full h-[200vh] z-[-1]"
      />

      <div className="max-w-7xl mt-20 mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left image side */}
        <motion.div className="flex justify-center">
          <img
            src="/images/AboutPage1.avif"
            alt=""
            className="w-full max-w-md rounded-lg shadow-lg"
          />
        </motion.div>

        {/* Right text side */}
        <motion.div className="text-white space-y-6">
          <div>
            <h1 className="font-pacifico text-4xl mb-2">About</h1>
            <h2 className="font-pacifico text-2xl">
              We are Passionate About Our Work
            </h2>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              We strive to provide our customers with the highest quality
            </h3>
            <p className="leading-relaxed">
              <span className="font-pacifico">VNTTWear</span> was founded in 1960
              by a group of fashion enthusiasts who recognized the positive impact
              that great style can have on our lives. Whether it’s boosting
              confidence, expressing individuality, or simply adding a touch of
              beauty to your everyday look, clothing is more than just
              fabric—it’s a lifestyle.
            </p>
          </div>

          <hr className="border-t border-gray-300 opacity-50" />

          <div className="space-y-2">
            <p className="italic text-lg">
              “We love what we do & create partnerships with our clients to ensure
              their digital transformation is positioned for long-term success.”
            </p>

            <div className="flex items-center gap-4 pt-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                {/* Image holder placeholder */}
                <span className="text-gray-700 text-sm">Img</span>
              </div>
              <div>
                <div className="font-semibold">Name</div>
                <div className="text-sm text-gray-300">Title</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div>

      </motion.div>
    </div>

  )
}
