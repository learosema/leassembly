class App {

  constructor(el) {
    this.el = el || document.querySelector('main')
    this.md = new markdownit();
    this.handleScroll = this.handleScroll.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyStroke = this.handleKeyStroke.bind(this);
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
      const lis = [...div.querySelectorAll('li')];
      lis.forEach(li => {
        li.classList.add('hide');
      });
      return {
        id: 'slide' + idx,
        title: (div.querySelector('h1') || {}).textContent,
        content: div.innerHTML
      };
    });
  }

  async run() {
    await this.getSlides();
    this.render();
    this.mounted();
  }

  mounted() {
    Prism.highlightAll();
    if (document.location.hash) {
      const hashElement = document.querySelector(document.location.hash);
      if (hashElement) {
        this.goTo(document.location.hash);
        this.onSlideEnter(hashElement);
      }
    } else {
      const slideId = 'slide0';
      this.goTo('#' + slideId);
      // window.scrollTo(0, 0);
    }
    this.el.addEventListener('scroll', this.handleScroll);
    this.handleScroll();
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyStroke);
    this.nav = this.el.querySelector('nav');
    this.nav.addEventListener('click', (e) => {
      if (e.target.nodeName === 'A') {
        const href = e.target.getAttribute('href');
        if (href[0] === '#' && href.length > 0) {
          this.updateRevealed(href.slice(1));
        }
      }
    });
    // this.el.classList.add('scrollbehavior--smooth');
    this.timeLeft = 20 * 60;
  }

  startClock() {
    this.displayClock();
    if (! this.timer) {
      this.timer = window.setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft-= 1;
        }
        this.displayClock();
      }, 1000);
    }
  }


  displayClock() {
    const timeLeft = this.timeLeft || 0;
    document.querySelector('.clock').textContent =
      `${(timeLeft / 60)|0}:${(timeLeft % 60).toString().padStart(2, '0')}`;
  }

  getScrollPositions() {
    const scrollPositions = [
      ...document.querySelectorAll('.slide')
    ].map(slide => {
      const rect = slide.getBoundingClientRect();
      return rect.top;
    }).map(Math.round);
    return scrollPositions;
  }

  getScrollIndex() {
    const h = document.body.getBoundingClientRect().height;
    return this.getScrollPositions().findIndex(x => x > -h + 1 && x < h);
  }

  onSlideEnter(slideElement) {
    // const lis = [...slideElement.querySelectorAll('li')];
    // lis.map(li => li.classList.add('hide'));
  }

  onSlideLeave(slideElement) {
  }

  handleScroll() {
    const currentPos = this.getScrollIndex();
    const hash = '#slide' + currentPos;
    if (hash !== document.location.hash) {
      // this.onSlideLeave(lastSlideElement, );
      this.onSlideEnter(document.querySelector(hash));
      history.replaceState(null, null, hash);
    }
    
    const currentDot = document.querySelector('li.current');
    const newDot = document.querySelectorAll('nav li')[currentPos];
    if (newDot !== currentDot) {
      if (currentDot) {
        currentDot.classList.remove('current');
      }
      if (newDot) {
        newDot.classList.add('current');
      }
      if (currentPos >= 1) {
        this.startClock();
      }
    }
  }

  handleKeyDown(e) {
    const SPACE = 32;
    if (e.keyCode === SPACE) {
      e.preventDefault();
      return;
    }
  }
  handleKeyStroke(e) {
    const ENTER = 13;
    const LEFT = 37;
    const RIGHT = 39;
    if (e.keyCode === ENTER || e.keyCode === RIGHT) {
      this.startClock();
      this.nextSlide();
      return;
    }
    if (e.keyCode === 32 && document.location.hash) {
      const slideId = document.location.hash.slice(1);
      const currentSlide = document.querySelector(document.location.hash);
      if (currentSlide) {
        const hiddenElement = currentSlide.querySelector('.hide');
        if (hiddenElement) {
          hiddenElement.classList.remove('hide');
          this.updateRevealed(slideId);
        } else {
          this.nextSlide();
        }
      }
      e.preventDefault();
      return;
    }
    if (e.keyCode === LEFT) {
      this.prevSlide();
      return;
    }
    e.preventDefault();
  }

  updateRevealed(slideId) {
    const slide = document.querySelector('#' + slideId);
    const dot = document.querySelector('#nav_' + slideId);
    const hiddenElements = slide.querySelectorAll('.hide');
    if (hiddenElements.length === 0) {
      dot.classList.add('revealed');
    } else {
      dot.classList.remove('revealed');
    }
  }


  goTo(hash) {
    const hashElement = document.querySelector(hash);
    if (hashElement) {
      const position = Math.round(hashElement.getBoundingClientRect().top + this.el.scrollTop);
      this.el.scrollTo(0, position);
      if (hash !== document.location.hash) {
        // this.onSlideEnter(hashElement);
        history.replaceState(null, null, hash)
      }
      this.updateRevealed(hash.slice(1));
    }
  }

  nextSlide() {
    const numSlides = document.querySelectorAll('.slide').length;
    const current = this.getScrollIndex();
    if (current + 1 < numSlides) {
      this.goTo('#slide' + (current + 1));
    }
  }

  prevSlide() {
    const current = this.getScrollIndex();
    if (current - 1 >= 0) {
      this.goTo('#slide' + (current - 1));
    }
  }

  render() {
    this.el.innerHTML = `
      <nav><ul>
        ${this.slides.map(slide =>
          `<li id="nav_${slide.id}"><a href="#${slide.id}" title="${slide.title}">${slide.title}</a></li>`
        ).join('')}
      </ul></nav>

      ${this.slides.map((slide) => `
      <div class="slide" id="${slide.id}">
        ${slide.content}
      </div>`).join('')}

      <div class="clock"></div>
    `;
  }

}

const app = new App();
app.run();