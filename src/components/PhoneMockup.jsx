import { Heart } from "lucide-react";

export default function PhoneMockup({ variant }) {
  return (
    <div className="phone" aria-hidden="true">
      <span className="phone-notch" />
      <div className="phone-screen">
        {variant === "nmj" ? (
          <>
            <div className="mini-top">
              <span className="mini-logo">N</span>
              <span className="mini-name">NMJ</span>
              <span className="mini-dot" />
            </div>
            <div className="mini-hero">
              <Heart />
              <strong>Give with heart</strong>
              <span>Support a cause today</span>
            </div>
            <span className="mini-btn" />
            <div className="mini-rows">
              <div className="mini-row">
                <span className="mini-avatar" />
                <span className="mini-lines">
                  <i />
                  <i />
                </span>
              </div>
              <div className="mini-row">
                <span className="mini-avatar" />
                <span className="mini-lines">
                  <i />
                  <i />
                </span>
              </div>
            </div>
          </>
        ) : null}

        {variant === "food" ? (
          <>
            <div className="mini-top">
              <span className="mini-logo">A</span>
              <span className="mini-name">ApnaFood</span>
              <span className="mini-dot" />
            </div>
            <div className="mini-search" />
            {[1, 2, 3].map((item) => (
              <div className="mini-food" key={item}>
                <span className={`mini-thumb ${item === 2 ? "mini-thumb-2" : ""} ${item === 3 ? "mini-thumb-3" : ""}`} />
                <span className="mini-lines">
                  <i />
                  <i />
                </span>
                <span className="mini-price">₹</span>
              </div>
            ))}
            <div className="mini-nav">
              <i />
              <i />
              <i />
              <i />
            </div>
          </>
        ) : null}

        {variant === "applyz" ? (
          <>
            <div className="mini-top">
              <span className="mini-logo">A</span>
              <span className="mini-name">ApplyZ</span>
              <span className="mini-bell" />
            </div>
            <div className="mini-tabs">
              <span className="is-on" />
              <span />
              <span />
            </div>
            {[1, 2, 3, 4].map((item) => (
              <div className="mini-job" key={item}>
                <span className="mini-job-icon" />
                <span className="mini-lines">
                  <i />
                  <i />
                </span>
                {item < 3 ? <span className="mini-badge">New</span> : null}
              </div>
            ))}
          </>
        ) : null}
      </div>
    </div>
  );
}
