export default function About() {
  return (
    <div className="about-layout">
      <div>
        <h1>About Us</h1>
        <p>
          We guarantee fresh produce. 
          <br />We guarantee sustainable produce. 
          <br />We guarantee organice produce.
          <br />We guarantee minimal co2 impact produce.
          <br />
          Save time by shopping on our app and we'll deliver the products right
          to your home. <br />
          <em>We use Stripe to process your payment.</em>
        </p>
      </div>
      <img
        src="https://mygocdatabucket.s3.eu-west-2.amazonaws.com/images+(3).jfif"
        height="275"
        width="463"
        className="rounded"
        alt=""
      />
    </div>
  );
}
