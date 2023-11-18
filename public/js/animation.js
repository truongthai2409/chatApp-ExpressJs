import { Application } from "@splinetool/runtime";
// let container = document.querySelector('.container');

document.addEventListener("DOMContentLoaded", function () {
  function showLoading() {
    document.getElementById("loadingData").style.display = "block";
  }

  function hideLoading() {
    document.getElementById("loadingData").style.display = "none";
  }

  function fetchingData() {
    showLoading();
    const canvas = document.getElementById("canvas3d");
    const app = new Application(canvas);
    app.load("https://prod.spline.design/XEjGPs-Hr5FE5giO/scene.splinecode");
    const promise = app.load(
      "https://prod.spline.design/XEjGPs-Hr5FE5giO/scene.splinecode"
    );
    promise.then(() => {
      if (promise.finally.name == "finally") {
        hideLoading();
      }
    });
  }
  
  fetchingData();
  // showLoading();
});

