import React from 'react';
import neptune1 from "./images/DSC00397.JPG";
import neptune2 from "./images/y5.jpg";

function Home() {
  const myHomeElement = (
  <main>
        <h1>Welcome To Hiker Club</h1>
        <div className="init_tag">
            <figure>
                <img src={neptune1} alt="yosemite" align="left" />
                <figcaption>Yosemite National Park</figcaption>
            </figure>
            <p>Hiking is a grand adventure -- your feet can take you to the most amazing places and amazing views and 'Hiker Club' is here to encourage you about hiking by providing a complete guide for hiker. Here you’ll find all of our hiking blog posts to help you hit the trail. Whether you’re looking for an awesome day hike with big views, the best hiking gear, or tips for taking your hiking skills to the next level, we’ve got you covered. &#129312; &#128507; &#128506; &#128248;</p>
        </div>
        <h2>Complete Guide To Hiking</h2><br />
        <div className="init_tag">
            <figure>
                <img src={neptune2} alt="yosemite" align="right" />
                <figcaption>Yosemite Four Mile Trail</figcaption>
            </figure>
            <p>Hiking has many mental and physical health benefits. Hiking is very helpful to reduce stress and even improve brain power. In my blog, I am going to share with you the benefits of hiking and a complete guide to start hiking.</p>
        </div>

    </main>
);
  return myHomeElement;
};
export default Home;