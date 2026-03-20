function calculate() {
    let price = parseFloat(document.getElementById("price").value);
    let dpInput = parseFloat(document.getElementById("dp").value);
    let rate = parseFloat(document.getElementById("rate").value) / 100;
    let years = parseInt(document.getElementById("years").value);
    let type = document.querySelector('input[name="interestType"]:checked').value;

    if (!price || !dpInput || !rate) {
        alert("Sila isi semua maklumat");
        return;
    }

  let dp, dpType;

// SMART DETECTION
if (dpInput <= 100 && dpInput <= price) {
    // kemungkinan besar percentage
    dp = price * (dpInput / 100);
    dpType = dpInput + "%";
} else {
    // anggap RM
    dp = dpInput;
    dpType = "RM " + dpInput;
}

// VALIDATION
if (dp > price) {
    alert("Down payment melebihi harga kereta!");
    return;
}

    let loan = price - dp;
    let months = years * 12;

    let monthly, total, interest;

    if (type === "reducing") {
        let r = rate / 12;

        monthly = loan * (r * Math.pow(1 + r, months)) /
            (Math.pow(1 + r, months) - 1);

        total = monthly * months;
        interest = total - loan;

        generateReducing(loan, monthly, r, months);
    } else {
        interest = loan * rate * years;
        total = loan + interest;
        monthly = total / months;

        generateFlat(loan, monthly, interest, months);
    }

    document.getElementById("result").innerHTML = `
        <div><span>Loan</span><span>RM ${loan.toFixed(2)}</span></div>
        <div><span>Down Payment</span><span>${dpType}</span></div>
        <div class="highlight"><span>Monthly</span><span>RM ${monthly.toFixed(2)}</span></div>
        <div><span>Total</span><span>RM ${total.toFixed(2)}</span></div>
        <div><span>Interest</span><span>RM ${interest.toFixed(2)}</span></div>
    `;

    document.getElementById("schedule").scrollIntoView();
}

/* REDUCING */
function generateReducing(balance, monthly, rate, months) {
    let tbody = document.querySelector("#schedule tbody");
    tbody.innerHTML = "";

    for (let i = 1; i <= months; i++) {
        let interest = balance * rate;
        let principal = monthly - interest;
        balance -= principal;

        tbody.innerHTML += `
        <tr>
            <td>${i}</td>
            <td>${monthly.toFixed(2)}</td>
            <td>${interest.toFixed(2)}</td>
            <td>${principal.toFixed(2)}</td>
            <td>${balance > 0 ? balance.toFixed(2) : 0}</td>
        </tr>`;
    }
}

/* FLAT */
function generateFlat(loan, monthly, totalInterest, months) {
    let tbody = document.querySelector("#schedule tbody");
    tbody.innerHTML = "";

    let principal = loan / months;
    let interest = totalInterest / months;
    let balance = loan;

    for (let i = 1; i <= months; i++) {
        balance -= principal;

        tbody.innerHTML += `
        <tr>
            <td>${i}</td>
            <td>${monthly.toFixed(2)}</td>
            <td>${interest.toFixed(2)}</td>
            <td>${principal.toFixed(2)}</td>
            <td>${balance > 0 ? balance.toFixed(2) : 0}</td>
        </tr>`;
    }
}