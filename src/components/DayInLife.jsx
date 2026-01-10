import { motion } from "motion/react";
import { FaCode, FaBookReader, FaUsers, FaCoffee } from "react-icons/fa";

const DayInLife = () => {
  const activities = [
    { 
      label: "Coding & Development", 
      percentage: 50, 
      color: "from-blue-400 to-indigo-600",
      icon: FaCode 
    },
    { 
      label: "Learning & Research", 
      percentage: 25, 
      color: "from-purple-400 to-pink-600",
      icon: FaBookReader
    },
    { 
      label: "Meetings & Collaboration", 
      percentage: 15, 
      color: "from-orange-400 to-red-500",
      icon: FaUsers
    },
    { 
      label: "Coffee & Breaks", 
      percentage: 10, 
      color: "from-green-400 to-emerald-600",
      icon: FaCoffee
    },
  ];

  return (
    <div className="w-full h-full p-4 flex flex-col justify-center">
      <div className="flex items-center justify-between mb-4">
        <div>
            <p className="headtext text-lg">A Day in My Life</p>
            <p className="subtext text-xs">How I spend my time building and learning.</p>
        </div>
        <FaCoffee className="text-orange-400 text-xl hidden md:block" />
      </div>

      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div key={index} className="relative">
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-lg bg-white/5 text-indigo-300">
                  <activity.icon size={12} />
                </div>
                <span className="font-medium text-sm text-neutral-200">{activity.label}</span>
              </div>
              <span className="text-neutral-400 font-mono text-xs">{activity.percentage}%</span>
            </div>
            
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${activity.percentage}%` }}
                transition={{ duration: 1.2, delay: index * 0.2, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.2 }}
                className={`h-full bg-gradient-to-r ${activity.color} rounded-full shadow-[0_0_10px_rgba(255,255,255,0.3)]`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayInLife;
