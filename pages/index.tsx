import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div>
      <Link href={"/getBitCoinInfo"} passHref>
        <a>Get BitCoin Rate</a>
      </Link>
    </div>
  );
};

export default Home;
