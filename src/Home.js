import { Link } from "react-router-dom";

export default function Home() {
  
  return (
    <div className="home-layout">
      <div>
        <h2>Grassfed, Organic, Carbon neutral</h2>
        <p>
          Guilt free products ordered from <em>GOC</em>. Use our easy to use app,
          and get your products delivered straight to your doorstep.
        </p>
        <Link to="products" className="btn btn-default">
          Start shopping
        </Link>
      </div>
      <img
        src='https://mygocdatabucket.s3.eu-west-2.amazonaws.com/images+(1).jfif'
        width="350"
        height="240"
        className="rounded home-image"
        alt=""
      />
      <img
        src='https://mygocdatabucket.s3.eu-west-2.amazonaws.com/Amici.webp'
        width="350"
        height="350"
        className="rounded home-image"
        alt=""
      />
      <div>
        <h2>Grassfed, Organic, Carbon neutral</h2>
        <p>
          Still having a great time, but using sustainable and guilt-free products. Our promise to you is that all of our products are from a sustainable, organic source and shipped in low carbon ways.
        </p>
        <Link to="about" className="btn btn-default">
          Learn more
        </Link>
      </div>
    </div>
  );
}
