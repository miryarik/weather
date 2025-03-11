import "../styles/modern-reset.css";
import "../styles/styles.css";
import "../styles/alt-styles.css";
import { loadInfo, spinner } from "./weatherInfo";

spinner(true);

document.addEventListener("DOMContentLoaded", () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
        const long = position.coords.longitude;
        const lat = position.coords.latitude;

        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}`
        );
        const data = await response.json();

        const city = data.address.city
            ? data.address.city
            : data.address.county;
        const state = data.address.state
            ? data.address.state
            : data.address.country
              ? data.address.country
              : data.address.region;

        loadInfo(`${city}, ${state}`);
    });

    const form = document.querySelector("form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const location = form.querySelector("input").value;
        loadInfo(location);
    });
});
