class App {

  constructor(el) {
    this.el = el || document.querySelector('main')
    this.md = new markdownit();
  }

  async getSlides() {
    const { md } = this;
    const response = await fetch("SLIDES.md", {cache: "no-cache"})
    const text = await response.text();
    this.slides = md.render(text).split('<hr>').map((slide, idx) => {
      const div = document.createElement('div');
      div.innerHTML = slide;
      const images = [...div.querySelectorAll('img')];
      images.forEach(image => {
        image.parentElement.setAttribute('class', 'slide__image');
      });
      const anchors = [...div.querySelectorAll('a')];
      anchors.forEach(anchor => {
        anchor.setAttribute('target', '_blank');
      });
      // const lis = [...div.querySelectorAll('li')];
      //lis.forEach(li => {
      //  li.classList.add('hide');
      //});
      return {
        id: 'slide' + idx,
        title: (div.querySelector('h1') || {}).textContent,
        content: div.innerHTML
      };
    });
  }

  render() {
    this.el.innerHTML = `
      <nav><ul>
        ${this.slides.map(slide =>
          `<li id="nav_${slide.id}"><a href="#${slide.id}" title="${slide.title}">${slide.title}</a></li>`
        ).join('')}
      </ul></nav>
    `;
  }

  mounted() {
    Prism.highlightAll();
  }

  async run() {
    await this.getSlides();
    this.render();
    this.mounted();
  }

}


const app = new App();
app.run();