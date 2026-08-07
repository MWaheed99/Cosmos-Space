const today = new Date().toISOString().split("T")[0];

// عرض تاريخ اليوم في الـ input
document.getElementById("apod-date-input").value = today;
document.getElementById("apod-date-input").max = today;

let apiKey = "yYjVYqyInFYCnoMbJhAywaYrCjcItLc6UWyyYerk";

  async function updateAPOD(date) {
  document.getElementById("today-in-space").innerHTML = `
    <div class="h-[600px] flex items-center justify-center">
      <div id="apod-loading" class="text-center">
        <i class="fas fa-spinner fa-spin text-4xl text-blue-400 mb-4"></i>
        <p class="text-slate-400">Loading today's image...</p>
      </div>
    </div>
  `;

  try {
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`);

    if (!response.ok) {
      throw new Error("HTTP Error: " + response.status);
    }

    const data = await response.json();

    displayApod(data);
  } catch (error) {
    console.log(error);

    document.getElementById("today-in-space").innerHTML = `
        <div class="h-[600px] flex items-center justify-center">
          <div class="text-center">
            <i class="fas fa-exclamation-triangle text-4xl text-red-400 mb-4"></i>
            <p class="text-red-400 font-semibold">
              Failed to load Astronomy Picture of the Day
            </p>
            <p class="text-slate-400 text-sm mt-2">
              Please try again later.
            </p>
          </div>
        </div>
      `;
  }
}

  updateAPOD(today);

  function displayApod(apod) {
    document.getElementById("today-in-space").innerHTML = `
    <div class="max-w-7xl mx-auto">
          <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
          >
            <div>
              <h2 class="text-xl md:text-2xl font-space font-bold mb-1">
                Today in Space
              </h2>
              <p id="apod-date" class="text-slate-400 text-xs md:text-sm">
                Astronomy Picture of the Day - March 14, 2024
              </p>
            </div>
            <div class="flex items-center space-x-2 md:space-x-3">
              <label for="apod-date-input" class="date-input-wrapper">
                <input
                  type="date"
                  id="apod-date-input"
                  class="custom-date-input"
                  value="${today}"
                  max="${today}"
                  min="1995-06-16"
                />
                <span id="apod-date-detail" class="text-sm">${today}</span>
              </label>
              <button
                id="load-date-btn"
                class="px-3 md:px-4 py-2 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold text-sm flex items-center space-x-1 md:space-x-2"
              >
                <i class="fas fa-search"></i>
                <span class="hidden sm:inline">Load</span>
              </button>
              <button
                id="today-apod-btn"
                class="px-3 md:px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl hover:bg-slate-700 transition-colors font-semibold text-sm"
              >
                Today
              </button>
            </div>
          </div>
          <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            <div class="xl:col-span-2">
              <div
                id="apod-image-container"
                class="relative rounded-2xl overflow-hidden group h-[300px] md:h-[400px] lg:h-[600px] bg-slate-800/50 flex items-center justify-center"
              >
                <div id="apod-loading" class="text-center hidden">
                  <i
                    class="fas fa-spinner fa-spin text-4xl text-blue-400 mb-4"
                  ></i>
                  <p class="text-slate-400">Loading today's image...</p>
                </div>
                <!-- Using a placeholder image or one from assets if available. Using a reliable external placeholder for now or a relative path if we knew one. Sticking to a colored placeholder div if no image, but let's try a realistic placeholder or just the rocket icon style used elsewhere if we want to be safe. But user wants design. I'll use a relative path assuming assets exist or a generic space placeholder. -->
                <img
                  id="apod-image"
                  class="w-full h-full object-cover"
                  src="${apod.url}"
                  alt="${apod.title}"
                />
                <div
                  class="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <div class="absolute bottom-6 left-6 right-6">
                    <button
                      class="w-full py-3 bg-white/10 backdrop-blur-md rounded-lg font-semibold hover:bg-white/20 transition-colors"
                    >
                      <i class="fas fa-expand mr-2"></i>View Full Resolution
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="space-y-4 md:space-y-6">
              <div
                class="bg-slate-800/50 border border-slate-700 rounded-xl md:rounded-2xl p-4 md:p-6"
              >
                <h3
                  id="apod-title"
                  class="text-lg md:text-2xl font-semibold mb-3 md:mb-4"
                >
                  ${apod.title}
                </h3>
                <div
                  class="flex items-center space-x-4 mb-4 text-sm text-slate-400"
                >
                  <span id="apod-date-detail"
                    ><i class="far fa-calendar mr-2"></i>2024-03-14</span
                  >
                </div>
                <p
                  id="apod-explanation"
                  class="text-slate-300 leading-relaxed mb-4"
                >
                  ${apod.explanation}
                </p>
                <div
                  id="apod-copyright"
                  class="text-xs text-slate-400 italic mb-4"
                >
                  ${apod.copyright ? `© ${apod.copyright}` : "© NASA"}
                </div>
              </div>
              <div
                class="bg-slate-800/50 border border-slate-700 rounded-2xl p-6"
              >
                <h4 class="font-semibold mb-3 flex items-center">
                  <i class="fas fa-info-circle text-blue-400 mr-2"></i>
                  Image Details
                </h4>
                <div class="space-y-3 text-sm">
                  <div class="flex justify-between">
                    <span class="text-slate-400">Date</span>
                    <span id="apod-date-info" class="font-medium"
                      >${apod.date}</span
                    >
                  </div>
                  <div class="flex justify-between">
                    <span class="text-slate-400">Media Type</span>
                    <span id="apod-media-type" class="font-medium">Image</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-slate-400">Source</span>
                    <span class="font-medium">NASA APOD</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    `;
  }


// launches data

async function getLaunches() {
	try {
		const response = await fetch("https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=10");
		const data = await response.json();

		console.log(data);
		displayFeaturedLaunch(data.results[0]);
		displayLaunches(data.results);
	} catch (error) {
		console.log(error);
	}
}

getLaunches();


function displayFeaturedLaunch(launch) {
  let now = new Date();
  let date = new Date(launch.net);

  let diff = date - now;

let daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));

  let launchDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  let launchTime =
    date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    }) + " UTC";

  document.getElementById("featured-launch").innerHTML = `
    <div
              class="relative bg-slate-800/30 border border-slate-700 rounded-3xl overflow-hidden group hover:border-blue-500/50 transition-all"
            >
              <div
                class="absolute inset-0 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
              ></div>
              <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
                <div class="flex flex-col justify-between">
                  <div>
                    <div class="flex items-center gap-3 mb-4">
                      <span
                        class="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold flex items-center gap-2"
                      >
                        <i class="fas fa-star"></i>
                        Featured Launch
                      </span>
                      <span
                        class="px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold"
                      >
                        ${launch.status.abbrev}
                      </span>
                    </div>
                    <h3 class="text-3xl font-bold mb-3 leading-tight">
                      ${launch.name}
                    </h3>
                    <div
                      class="flex flex-col xl:flex-row xl:items-center gap-4 mb-6 text-slate-400"
                    >
                      <div class="flex items-center gap-2">
                        <i class="fas fa-building"></i>
                        <span>${launch.launch_service_provider.name}</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <i class="fas fa-rocket"></i>
                        <span>${launch.rocket.configuration.name}</span>
                      </div>
                    </div>
                    ${daysLeft > 0 ? `
                      <div class="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-xl mb-6">
                        <i class="fas fa-clock text-2xl text-blue-400"></i>
                        <div>
                          <p class="text-2xl font-bold text-blue-400">${daysLeft}</p>
                          <p class="text-xs text-slate-400">Days Until Launch</p>
                        </div>
                      </div>
                      ` : ""}
                    <div class="grid xl:grid-cols-2 gap-4 mb-6">
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-calendar"></i>
                          Launch Date
                        </p>
                        <p class="font-semibold">${launchDate}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-clock"></i>
                          Launch Time
                        </p>
                        <p class="font-semibold">${launchTime}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-map-marker-alt"></i>
                          Location
                        </p>
                        <p class="font-semibold text-sm">${launch.pad.location.name}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-globe"></i>
                          Country
                        </p>
                        <p class="font-semibold">${launch.pad.location.country}</p>
                      </div>
                    </div>
                    <p class="text-slate-300 leading-relaxed mb-6">
                      ${launch.mission.description}
                    </p>
                  </div>
                  <div class="flex flex-col md:flex-row gap-3">
                    <button
                      class="flex-1 self-start md:self-center px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                      <i class="fas fa-info-circle"></i>
                      View Full Details
                    </button>
                    <div class="icons self-end md:self-center">
                      <button
                        class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                      >
                        <i class="far fa-heart"></i>
                      </button>
                      <button
                        class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                      >
                        <i class="fas fa-bell"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="relative">
                  <div
                    class="relative h-full min-h-[400px] rounded-2xl overflow-hidden bg-slate-900/50"
                  >
                    <!-- Placeholder image/icon since we can't load external images reliably without correct URLs -->
                    <div
                      class="flex items-center justify-center h-full min-h-[400px] bg-slate-800"
                    >
                      <img
                src="${launch.image?.image_url}"
                alt="${launch.name}"
                class="w-full h-full object-cover"
                onerror="this.onerror=null; this.src='assets/images/launch-placeholder.png';"
              />
                    </div>
                    <div
                      class="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
  `;
}

function displayLaunches(launches) {
	let box = "";

	for (let i = 1; i < launches.length; i++) {
		let date = new Date(launches[i].net);

		let launchDate = date.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		});

		let launchTime =
			date.toLocaleTimeString("en-US", {
				hour: "2-digit",
				minute: "2-digit",
				timeZone: "UTC",
			}) + " UTC";
		box += `
      <div
              class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer"
            >
              <div
                class="relative h-48 bg-slate-900/50 flex items-center justify-center"
              >
              <img
                src="${launches[i].image?.image_url}"
                alt="${launches[i].name}"
                class="w-full h-full object-cover"
                onerror="this.onerror=null; this.src='assets/images/launch-placeholder.png';"
              />
                
                <div class="absolute top-3 right-3">
                  <span
                    class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold"
                  >
                    ${launches[i].status.abbrev}
                  </span>
                </div>
              </div>
              <div class="p-5">
                <div class="mb-3">
                  <h4
                    class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors"
                  >
                    ${launches[i].name}
                  </h4>
                  <p class="text-sm text-slate-400 flex items-center gap-2">
                    <i class="fas fa-building text-xs"></i>
                    ${launches[i].launch_service_provider.name}
                  </p>
                </div>
                <div class="space-y-2 mb-4">
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-calendar text-slate-500 w-4"></i>
                    <span class="text-slate-300">${launchDate}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-clock text-slate-500 w-4"></i>
                    <span class="text-slate-300">${launchTime}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-rocket text-slate-500 w-4"></i>
                    <span class="text-slate-300">${launches[i].rocket.configuration.name}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                    <span class="text-slate-300 line-clamp-1">${launches[i].pad.location.name}</span>
                  </div>
                </div>
                <div
                  class="flex items-center gap-2 pt-4 border-t border-slate-700"
                >
                  <button
                    class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold"
                  >
                    Details
                  </button>
                  <button
                    class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    <i class="far fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>
    `;
	}

	document.getElementById("launches-grid").innerHTML = box;
}


// planets

async function getPlanets() {
  try {
    const response = await fetch("https://solar-system-opendata-proxy.vercel.app/api/planets");
    const data = await response.json();

    console.log('planets data', data);

    displayPlanets(data.bodies);
    displayPlanetsTable(data.bodies);
  } catch (error) {
    console.log(error);
  }
}

getPlanets();

function displayPlanets(planets) {

    let box = "";
    

    for(let i = 0; i < planets.length; i++){
      const AU = (planets[i].semimajorAxis / 149597870.7).toFixed(2);
        box += `<div
              class="planet-card bg-slate-800/50 border border-slate-700 rounded-2xl p-4 transition-all cursor-pointer group"
              data-planet-id="uranus"
              style="--planet-color: #06b6d4"
              onmouseover="this.style.borderColor='#06b6d480'"
              onmouseout="this.style.borderColor='#334155'"
            >
              <div class="relative mb-3 h-24 flex items-center justify-center">
                <img
                  class="w-20 h-20 object-contain group-hover:scale-110 transition-transform"
                  src="${planets[i].image}"
                  alt="${planets[i].englishName}"
                />
              </div>
              <h4 class="font-semibold text-center text-sm">${planets[i].englishName}</h4>
              <p class="text-xs text-slate-400 text-center">${AU} AU</p>
            </div>`;

    }

    document.getElementById("planets-grid").innerHTML = box;
}



function displayPlanetsTable(planets) {
  let box = "";

  for (let i = 0; i < planets.length; i++) {

    let distance = (planets[i].semimajorAxis / 149597870.7).toFixed(2);

    let diameter = (planets[i].meanRadius * 2).toLocaleString();

    let mass = (
      (planets[i].mass.massValue * Math.pow(10, planets[i].mass.massExponent)) /
      5.972e24
    ).toFixed(3);

    let orbitalPeriod =
      planets[i].sideralOrbit >= 365
        ? (planets[i].sideralOrbit / 365).toFixed(1) + " years"
        : Math.round(planets[i].sideralOrbit) + " days";

    let moons = planets[i].moons ? planets[i].moons.length : 0;

    let badgeStyle = "";

switch (planets[i].type) {
  case "Terrestrial":
    badgeStyle = "background:#f97316;color:#fed7aa;";
    break;

  case "Gas Giant":
    badgeStyle = "background:#9333ea;color:#e9d5ff;";
    break;

  case "Ice Giant":
    badgeStyle = "background:#2563eb;color:#bfdbfe;";
    break;

  default:
    badgeStyle = "background:#475569;color:#e2e8f0;";
}

    box += `
      <tr class="hover:bg-slate-800/30 transition-colors">

        <td class="px-4 md:px-6 py-3 md:py-4 sticky left-0 bg-slate-800 z-10">
          <div class="flex items-center space-x-3">

            <img
              src="${planets[i].image}"
              alt="${planets[i].englishName}"
              class="w-8 h-8 rounded-full object-cover"
              onerror="this.onerror=null;this.src='assets/images/planet-placeholder.png';"
            >

            <span class="font-semibold whitespace-nowrap">
              ${planets[i].englishName}
            </span>

          </div>
        </td>

        <td class="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
          ${distance}
        </td>

        <td class="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
          ${diameter}
        </td>

        <td class="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
          ${mass}
        </td>

        <td class="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
          ${orbitalPeriod}
        </td>

        <td class="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
          ${moons}
        </td>

        <td class="px-4 md:px-6 py-3 md:py-4">
          <span class="px-2 py-1 rounded text-xs"
          style="${badgeStyle}">
            ${planets[i].type}
          </span>
        </td>

      </tr>
    `;
  }

  document.getElementById("planet-comparison-tbody").innerHTML = box;
}







// actions btns

const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebar-toggle");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".app-section");

// Toggle Sidebar
sidebarToggle.onclick = function () {
	sidebar.classList.toggle("sidebar-open");
};

// التنقل بين السكاشن
for (let i = 0; i < navLinks.length; i++) {
	navLinks[i].onclick = function (e) {
		e.preventDefault();

		let target = this.dataset.section;

		// إخفاء كل السكاشن
		for (let j = 0; j < sections.length; j++) {
			sections[j].classList.add("hidden");

			if (sections[j].dataset.section == target) {
				sections[j].classList.remove("hidden");
			}
		}

		// تغيير الـ Active Link
		for (let j = 0; j < navLinks.length; j++) {
			navLinks[j].classList.remove("bg-blue-500/10", "text-blue-400");
			navLinks[j].classList.add("text-slate-300");
		}

		this.classList.remove("text-slate-300");
		this.classList.add("bg-blue-500/10", "text-blue-400");

		// قفل السايد بار في الموبايل
		if (window.innerWidth < 1024) {
			sidebar.classList.remove("sidebar-open");
		}
	};
}
