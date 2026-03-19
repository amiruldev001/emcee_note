function calculate() {
    let price = parseFloat(document.getElementById("price").value);
    let dpPercent = parseFloat(document.getElementById("dp").value);
    let rate = parseFloat(document.getElementById("rate").value) / 100;
    let years = parseInt(document.getElementById("years").value);

    let type = document.querySelector('input[name="interestType"]:checked').value;

    if (!price || !dpPercent || !rate) {
        alert("Isi semua maklumat");
        return;
    }

    let dp = price * (dpPercent / 100);
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
        // FLAT RATE
        interest = loan * rate * years;
        total = loan + interest;
        monthly = total / months;

        generateScheduleFlat(loan, monthly, interest, months);
    }

    document.getElementById("result").innerHTML = `
        <strong>Loan:</strong> RM ${loan.toFixed(2)}<br>
        <strong>Monthly:</strong> RM ${monthly.toFixed(2)}<br>
        <strong>Total:</strong> RM ${total.toFixed(2)}<br>
        <strong>Interest:</strong> RM ${interest.toFixed(2)}
    `;
}

// REDUCING BALANCE
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

// FLAT RATE
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