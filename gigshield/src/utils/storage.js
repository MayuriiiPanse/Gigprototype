const DEMO_DATA = {
  id: "GS-IN-7742-MH",
  name: "Ravi Kumar",
  city: "Indore, Madhya Pradesh",
  gigscore: 742,
  stats: {
    earnings: "₹23,600",
    orders: 619,
    days: "26/30",
    streak: 12,
    onTime: "95%"
  },
  earningsData: [
    { month: "Oct", total: 18400, zomato: 9200, swiggy: 6800, ola: 2400 },
    { month: "Nov", total: 19800, zomato: 10200, swiggy: 7100, ola: 2500 },
    { month: "Dec", total: 17200, zomato: 8800, swiggy: 6200, ola: 2200 },
    { month: "Jan", total: 21400, zomato: 11000, swiggy: 7600, ola: 2800 },
    { month: "Feb", total: 22100, zomato: 11800, swiggy: 7500, ola: 2800 },
    { month: "Mar", total: 23600, zomato: 12400, swiggy: 8200, ola: 3000 }
  ],
  platforms: ["Zomato", "Swiggy", "Ola"],
  breakdown: "High delivery rating but 12 inactive days affecting consistency."
};

export function loadDemoData() {
  const saved = localStorage.getItem('gigshieldData');
  if (saved) return JSON.parse(saved);
  localStorage.setItem('gigshieldData', JSON.stringify(DEMO_DATA));
  return DEMO_DATA;
}
