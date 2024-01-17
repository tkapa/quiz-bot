import React from "react";

export async function getStaticProps() {}

const Quiz = ({ params }: { params: { slug: string } }) => {
  return (
    <main>
      <h1>Quiz for {params.slug}</h1>
    </main>
  );
};

export default Quiz;
