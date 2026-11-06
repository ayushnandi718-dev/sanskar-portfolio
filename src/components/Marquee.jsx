import { marqueeItems } from "../data/portfolio";

export default function Marquee() {
  return (
    <div
      aria-hidden="true"
      className="marquee border-y border-white/10 bg-white/[0.012] py-4"
    >
      <div className="marquee-track">
        {[0, 1].map((group) => (
          <div key={group} className="flex">
            {marqueeItems.map((item) => (
              <span key={`${group}-${item}`} className="marquee-item">
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
