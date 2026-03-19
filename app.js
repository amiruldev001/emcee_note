function calculate() {
    let price = parseFloat(document.getElementById("price").value);
    let dpInput = parseFloat(document.getElementById("dp").value);
    let rate = parseFloat(document.getElementById("rate").value) / 100;
    let years = parseInt(document.getElementById("years").value);
    let type = document.querySelector('input[name="interestType"]:checked').value;

    if (!price || !dpInput || !rate) {
        alert("Isi semua maklumat");
        return;
    }

    // AUTO DETECT DP
    let dp;
    let dpType;

    if (dpInput <= 100) {
        dp = price * (dpInput / 100);
        dpType = dpInput + "%";
    } else {
        dp = dpInput;
        dpType = "RM " + dpInput;
    }

    if (dp > price) {
        alert("Down payment tak boleh lebih dari harga kereta");
        return;
    }

    let loan = price - dp;
    let months = years * 12;

    let monthly, total, interest;

    if (type === "reducing") {
        let monthlyRate = rate / 12;

        monthly = loan * (monthlyRate * Math.pow(1 + monthlyRate, months)) /
            (Math.pow(1 + monthlyRate, months) - 1);

        total = monthly * months;
        interest = total - loan;

        generateScheduleReducing(loan, monthly, monthlyRate, months);

    } else {
        interest = loan * rate * years;
        total = loan + interest;
        monthly = total / months;

        generateScheduleFlat(loan, monthly, interest, months);
    }

    document.getElementById("result").innerHTML = `
        <div><span>Loan</span><span>RM ${loan.toFixed(2)}</span></div>
        <div><span>Down Payment</span><span>${dpType}</span></div>
        <div class="highlight"><span>Monthly</span><span>RM ${monthly.toFixed(2)}</span></div>
        <div><span>Total</span><span>RM ${total.toFixed(2)}</span></div>
        <div><span>Interest</span><span>RM ${interest.toFixed(2)}</span></div>
    `;
}

// REDUCING
function generateScheduleReducing(balance, monthly, rate, months) {
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

// FLAT
function generateScheduleFlat(loan, monthly, totalInterest, months) {
    let tbody = document.querySelector("#schedule tbody");
    tbody.innerHTML = "";

    let monthlyPrincipal = loan / months;
    let monthlyInterest = totalInterest / months;
    let balance = loan;

    for (let i = 1; i <= months; i++) {
        balance -= monthlyPrincipal;

        tbody.innerHTML += `
        <tr>
            <td>${i}</td>
            <td>${monthly.toFixed(2)}</td>
            <td>${monthlyInterest.toFixed(2)}</td>
            <td>${monthlyPrincipal.toFixed(2)}</td>
            <td>${balance > 0 ? balance.toFixed(2) : 0}</td>
        </tr>`;
    }
}