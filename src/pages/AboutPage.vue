<template>
  <div class="about">
    <h1>About Us</h1>
    
    <section class="vision">
      <h2>Our Vision</h2>
      <p>Hey there! Our goal is to develop creative and user-friendly applications that address real-world issues. We truly believe in the power of technology to change lives and are dedicated to providing top-notch software solutions.</p>
    </section>

    <section class="team">
      <h2>Development Team</h2>
      <p>Our team is composed of dedicated developers who proficiently leverage the latest tools and technologies to ensure that our projects are efficient, scalable, and maintainable. Some of the tools we used are:</p>
      <ul>
        <li>Vue.js</li>
        <li>BootstrapVue</li>
        <li>Axios</li>
        <li>Vuelidate</li>
        <li>JavaScript</li>
      </ul>
    </section>

    <section class="developers">
      <h2>Meet Our Developers</h2>
      
      <div class="developer">
        <h3>Yoav Zelinger</h3>
        <p><strong>Introduction:</strong></p>
        <p>Yoav Zelinger is an expert in backend development with a passion for creating robust and scalable APIs.</p>
        
        <p><strong>Background:</strong></p>
        <p>Yoav has extensive experience and expertise in backend development. He focuses on creating robust and scalable APIs and plays a crucial role in ensuring our applications run smoothly and efficiently.</p>
        
        <p><strong>Key Skills and Contributions:</strong></p>
        <ul>
          <li>Proficient in backend programming languages such as Node.js and Python.</li>
          <li>Experienced with frameworks like Express.js and Django.</li>
          <li>Skilled in database management using PostgreSQL.</li>
          <li>Contributed to enhancing application performance and reliability through efficient API development.</li>
          <li>Worked on several successful projects, including a high-traffic e-commerce platform and a real-time data processing system.</li>
        </ul>
      </div>

      
      <div class="developer">
        <h3>Itzik Elbazis</h3>
        <p><strong>Introduction:</strong></p>
        <p>Itzik Elbazis is a seasoned software engineer with a strong background in frontend development.</p>
        
        <p><strong>Background:</strong></p>
        <p>Itzik specializes in building responsive and intuitive user interfaces. He has extensive experience in creating user-friendly web applications. Itzik's focus is on developing seamless and interactive experiences for users.</p>
        
        <p><strong>Key Skills and Contributions:</strong></p>
        <ul>
          <li>Proficient in frontend programming languages and frameworks such as Vue.js and React.</li>
          <li>Experienced with HTML, CSS, and JavaScript.</li>
          <li>Skilled in designing and implementing responsive and user-friendly interfaces.</li>
          <li>Contributed to the success of various projects through innovative solutions and exceptional problem-solving skills.</li>
          <li>Worked on notable projects, including a real-time collaboration tool and an interactive data visualization platform.</li>
        </ul>
      </div>
    </section>

    <section class="previous-works">
      <h2>Previous Works</h2>
      <ul>
        <li><a href="https://github.com/Yoav-Itzik-org/Information-Retrieval-Project">Search Engine</a>
          <p>A search engine project focused on efficient and accurate retrieval of information from Wikipedia.</p></li>
        <li><a href="https://github.com/Yoav-Itzik-org/ATP-Project">Maze</a>
          <p>An interactive maze-solving application that demonstrates pathfinding algorithms and visualization techniques.</p></li>
        <li><a href="https://github.com/Group-K-BGU/ADSS_Group_K">SuperMarket System</a>
          <p>A comprehensive supermarket management system that handles inventory, sales, and customer management.</p></li>
      </ul>
    </section>

    <section class="contact">
      <h2>Contact Us</h2>
      <p>If you have any questions or would like to get in touch, feel free to contact us at:</p>
      <ul>
        <li>Yoav Zelinger: <a href="mailto:yoavzel@post.bgu.ac.il">yoavzel@post.bgu.ac.il</a></li>
        <li>Itzik Elbazis: <a href="mailto:elbazis@post.bgu.ac.il">elbazis@post.bgu.ac.il</a></li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: "About",
};
</script>


<style scoped>
.about {
  padding: 20px;
}

a {
  text-decoration: none;
}
</style>
