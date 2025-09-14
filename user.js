// User Dashboard Interactivity

document.addEventListener('DOMContentLoaded', function() {
	// Smooth nav
	const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
	navLinks.forEach(link => {
		link.addEventListener('click', e => {
			e.preventDefault();
			document.querySelector(link.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
		});
	});

	initAlerts();
	initConsumptionChart();
	initWeather();
	initCalculator();
});

// ---------------- Alerts ----------------
function initAlerts() {
	const alertList = document.getElementById('alert-list');
	const filters = document.querySelectorAll('.chip');

	const demoAlerts = [
		{ type: 'grid', icon: 'bolt', title: 'Peak Load Alert', msg: 'High grid load from 6pm-9pm. Consider switching to solar.', time: 'Just now' },
		{ type: 'solar', icon: 'solar-panel', title: 'Great Solar Window', msg: 'Solar output optimal between 10am-2pm today.', time: '10m ago' },
		{ type: 'weather', icon: 'cloud-sun', title: 'Cloud Cover Incoming', msg: 'Expect reduced solar output after 3pm.', time: '30m ago' },
		{ type: 'grid', icon: 'plug', title: 'Scheduled Maintenance', msg: 'Brief outage expected at 1am tonight in your area.', time: '1h ago' }
	];

	function render(filter = 'all') {
		alertList.innerHTML = '';
		demoAlerts
			.filter(a => filter === 'all' ? true : a.type === filter)
			.forEach(a => {
				const el = document.createElement('div');
				el.className = `alert-item ${a.type}`;
				el.innerHTML = `
					<div class="alert-icon"><i class="fas fa-${a.icon}"></i></div>
					<div class="alert-info">
						<h4>${a.title}</h4>
						<p>${a.msg}</p>
					</div>
					<div class="alert-meta">${a.time}</div>
				`;
				alertList.appendChild(el);
			});
	}

	filters.forEach(btn => {
		btn.addEventListener('click', () => {
			filters.forEach(b => b.classList.remove('active'));
			btn.classList.add('active');
			render(btn.dataset.filter);
		});
	});

	render('all');
}

// ---------------- Consumption Chart ----------------
function initConsumptionChart() {
	const canvas = document.getElementById('consumption-chart');
	if (!canvas) return;
	const ctx = canvas.getContext('2d');
	const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
	const data = days.map(() => +(Math.random()*6 + 2).toFixed(1));

	function drawChart() {
		const w = canvas.width = canvas.clientWidth;
		const h = canvas.height = 200;
		ctx.clearRect(0,0,w,h);
		const padding = 30;
		const max = Math.max(...data) * 1.2;
		const barW = (w - padding*2) / data.length * 0.6;
		const gap = (w - padding*2) / data.length * 0.4;

		// axes
		ctx.strokeStyle = 'rgba(255,255,255,0.2)';
		ctx.beginPath();
		ctx.moveTo(padding, h - padding);
		ctx.lineTo(w - padding, h - padding);
		ctx.stroke();

		// bars
		data.forEach((val, i) => {
			const x = padding + i * (barW + gap) + gap/2;
			const barH = (val / max) * (h - padding*2);
			const y = h - padding - barH;
			const grd = ctx.createLinearGradient(0, y, 0, y + barH);
			grd.addColorStop(0, '#00ff88');
			grd.addColorStop(1, '#00d4ff');
			ctx.fillStyle = grd;
			ctx.fillRect(x, y, barW, barH);
			// labels
			ctx.fillStyle = 'rgba(255,255,255,0.7)';
			ctx.font = '12px Inter, sans-serif';
			ctx.textAlign = 'center';
			ctx.fillText(days[i], x + barW/2, h - padding + 16);
			ctx.fillText(val + ' kWh', x + barW/2, y - 6);
		});
	}

	const today = data[data.length-1];
	const week = data.reduce((a,b)=>a+b,0);
	const month = (week * 4.3);
	document.getElementById('consumption-today').textContent = today.toFixed(1) + ' kWh';
	document.getElementById('consumption-week').textContent = week.toFixed(1) + ' kWh';
	document.getElementById('consumption-month').textContent = month.toFixed(1) + ' kWh';

	drawChart();
	window.addEventListener('resize', drawChart);
}

// ---------------- Weather ----------------
function initWeather() {
	// For demo purposes, we simulate weather. Integrate real API later.
	const temp = (Math.random()*8 + 24).toFixed(1);
	document.getElementById('weather-temp').textContent = `${temp}°C`;
	document.getElementById('weather-desc').textContent = 'Partly cloudy';
	document.getElementById('weather-wind').textContent = `Wind: ${(Math.random()*12+4).toFixed(1)} km/h`;
	document.getElementById('weather-humidity').textContent = `Humidity: ${(Math.random()*50+30).toFixed(0)}%`;
	document.getElementById('weather-uv').textContent = `UV: ${(Math.random()*8).toFixed(1)}`;

	const forecastEl = document.getElementById('weather-forecast');
	const days = ['Mon','Tue','Wed','Thu','Fri'];
	days.forEach(d => {
		const t = (Math.random()*8 + 24).toFixed(0);
		const card = document.createElement('div');
		card.className = 'forecast-item';
		card.innerHTML = `
			<span class="day">${d}</span>
			<i class="fas fa-cloud-sun"></i>
			<span class="t">${t}°C</span>
		`;
		forecastEl.appendChild(card);
	});
}

// ---------------- Calculator ----------------
function initCalculator() {
	const addBtn = document.getElementById('add-appliance');
	const list = document.getElementById('appliance-list');
	const totalKwh = document.getElementById('total-kwh');
	const totalCost = document.getElementById('total-cost');

	const items = [];

	function recalc() {
		const costPerKwh = parseFloat(document.getElementById('cost-per-kwh').value) || 0;
		const dailyKwh = items.reduce((sum, it) => sum + (it.watts * it.hours) / 1000, 0);
		totalKwh.textContent = dailyKwh.toFixed(2) + ' kWh';
		totalCost.textContent = '₹' + (dailyKwh * costPerKwh).toFixed(2);
	}

	function render() {
		list.innerHTML = '';
		items.forEach((it, idx) => {
			const row = document.createElement('div');
			row.className = 'appliance-row';
			row.innerHTML = `
				<div class="appliance-meta">
					<i class="fas fa-plug"></i>
					<div>
						<div class="name">${it.name}</div>
						<div class="sub">${it.watts}W · ${it.hours}h/day</div>
					</div>
				</div>
				<div class="appliance-actions">
					<button class="chip small" data-action="remove" data-idx="${idx}"><i class="fas fa-trash"></i> Remove</button>
				</div>
			`;
			list.appendChild(row);
		});
		recalc();
	}

	list.addEventListener('click', e => {
		const btn = e.target.closest('button[data-action="remove"]');
		if (!btn) return;
		const idx = +btn.dataset.idx;
		items.splice(idx, 1);
		render();
	});

	addBtn.addEventListener('click', e => {
		e.preventDefault();
		const name = document.getElementById('appliance-name').value.trim();
		const watts = parseFloat(document.getElementById('appliance-watts').value);
		const hours = parseFloat(document.getElementById('appliance-hours').value);
		if (!name || !(watts > 0) || !(hours >= 0)) {
			showToast('Please fill valid appliance details');
			return;
		}
		items.push({ name, watts, hours });
		document.getElementById('appliance-name').value = '';
		document.getElementById('appliance-watts').value = '';
		document.getElementById('appliance-hours').value = '';
		render();
	});

	render();
}

// Lightweight toast for user page
function showToast(message) {
	const n = document.createElement('div');
	n.className = 'toast';
	n.textContent = message;
	n.style.cssText = 'position:fixed;bottom:20px;right:20px;background:linear-gradient(45deg,#00ff88,#00d4ff);color:#000;padding:10px 14px;border-radius:10px;font-weight:600;box-shadow:0 10px 25px rgba(0,0,0,0.3);z-index:10000;transform:translateY(80px);transition:transform .3s ease';
	document.body.appendChild(n);
	setTimeout(()=>{ n.style.transform = 'translateY(0)'; }, 50);
	setTimeout(()=>{ n.style.transform = 'translateY(80px)'; setTimeout(()=> n.remove(), 300); }, 2500);
}
