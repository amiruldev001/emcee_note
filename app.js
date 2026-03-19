function calculate() {
    let price = parseFloat(document.getElementById("price").value);
    let dpPercent = parseFloat(document.getElementById("dp").value);
    let rate = parseFloat(document.getElementById("rate").value) / 100;
    let years = parseInt(document.getElementById("years").value);

    if (!price || !dpPercent || !rate) {
        alert("Isi semua maklumat");
        return;
    }

    let dp = price * (dpPercent / 100);
    let loan = price - dp;
    let months = years * 12;
    let monthlyRate = rate / 12;

    let monthly = loan * (monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);

    let total = monthly * months;
    let interest = total - loan;

    document.getElementById("result").innerHTML = `
        Loan: RM ${loan.toFixed(2)}<br>
        Monthly: RM ${monthly.toFixed(2)}<br>
        Total: RM ${total.toFixed(2)}<br>
        Interest: RM ${interest.toFixed(2)}
    `;

    generateSchedule(loan, monthly, monthlyRate, months);
}

function generateSchedule(balance, monthly, rate, months) {
    let tbody = document.querySelector("#schedule tbody");
    tbody.innerHTML = "";

    for (let i = 1; i <= months; i++) {
        let interest = balance * rate;
        let principal = monthly - interest;
        balance -= principal;

        let row = `
            <tr>
                <td>${i}</td>
                <td>${monthly.toFixed(2)}</td>
                <td>${interest.toFixed(2)}</td>
                <td>${principal.toFixed(2)}</td>
                <td>${balance > 0 ? balance.toFixed(2) : 0}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    }
}