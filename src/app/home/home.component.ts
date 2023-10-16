import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor() {
    import("tw-elements").then(({ initTE, Ripple }) => {
      initTE({ Ripple });
    });
  }

  ngOnInit() {
    const mybutton = document.getElementById("btn-back-to-top");

    if (mybutton) {
      const scrollFunction = () => {
        if (
          document.body.scrollTop > 20 ||
          document.documentElement.scrollTop > 20
        ) {
          mybutton.classList.remove("hidden");
        } else {
          mybutton.classList.add("hidden");
        }
      };

      const backToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      };

      mybutton.addEventListener("click", backToTop);

      window.addEventListener("scroll", scrollFunction);
    }
  }
}
