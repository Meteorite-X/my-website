for (let i = 1; i <= 8; i++) {
    const exercise = document.querySelector(`#exercise${i}`);
    const input = exercise.querySelector("input");
    if (input) {
        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                exercise.querySelector("button").click();
            }
        });
    }
}


// Дасгал 1 - Палиндром шалгах
document.querySelector("#exercise1 button").addEventListener("click", () => {
    const name = document.querySelector("#exercise1 input").value.trim().toLowerCase();
    const reversed = name.split("").reverse().join("");
    const isPalindrome = name === reversed;
    document.querySelector("#exercise1 .answer").innerText =
        isPalindrome ? "Палиндром нэр байна." : "Палиндром нэр биш байна.";
});

// Дасгал 2 - Цифрүүдийн нийлбэр
document.querySelector("#exercise2 button").addEventListener("click", () => {
    const num = document.querySelector("#exercise2 input").value;
    const sum = num.split("").reduce((acc, d) => acc + (+d), 0);
    document.querySelector("#exercise2 .answer").innerText = `Цифрүүдийн нийлбэр: ${sum}`;
});

// Дасгал 3 - Анхны тоонд задлах
document.querySelector("#exercise3 button").addEventListener("click", () => {
    const target = parseInt(document.querySelector("#exercise3 input").value);

    function isPrime(n) {
        if (n < 2) return false;
        for (let i = 2; i <= Math.sqrt(n); i++) {
            if (n % i === 0) return false;
        }
        return true;
    }

    // боломжит анхны тоонууд
    const primes = [];
    for (let i = 2; i <= target; i++) {
        if (isPrime(i)) primes.push(i);
    }

    let found = false;
    let result = [];

    function backtrack(remaining, currentList, index) {
        if (remaining === 0) {
            result = [...currentList];
            found = true;
            return;
        }
        if (remaining < 0 || index >= primes.length || found) return;

        // Давтан ашиглах боломжтой тул index-ийг дахин дамжуулна
        currentList.push(primes[index]);
        backtrack(remaining - primes[index], currentList, index);
        currentList.pop();

        // Дараагийн анхны тоог үзнэ
        backtrack(remaining, currentList, index + 1);
    }

    backtrack(target, [], 0);

    const answer = found
        ? `Анхны тоонуудын нийлбэр: ${result.join(" + ")}`
        : "Ийм анхны тоонуудын нийлбэр олдсонгүй.";

    document.querySelector("#exercise3 .answer").innerText = answer;
});


// Дасгал 4 - Гүйцэх хугацаа
document.querySelector("#exercise4 button").addEventListener("click", () => {
    const distance = parseFloat(document.querySelector("#exercise4 input").value);
    const diffSpeed = 25 - 18; // км/ц
    const timeInHours = distance / diffSpeed;
    const totalSeconds = Math.round(timeInHours * 3600);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    document.querySelector("#exercise4 .answer").innerText = `${minutes} минут ${seconds} секунд`;
});

// Дасгал 5 – Сайжруулсан хувилбар
document.querySelector("#exercise5 button").addEventListener("click", () => {
    const raw = document.querySelector("#exercise5 input").value;
    const parts = raw.split(",");
    const numbers = [];
    const invalids = [];

    parts.forEach(val => {
        const trimmed = val.trim();
        const num = parseInt(trimmed);
        if (!isNaN(num)) {
            numbers.push(num);
        } else if (trimmed !== "") {
            invalids.push(trimmed);
        }
    });

    if (numbers.length === 0) {
        document.querySelector("#exercise5 .answer").innerText = "Тоонууд оруулаагүй байна.";
        return;
    }
    if (invalids.length > 0) {
        document.querySelector("#exercise5 .answer").innerText =
            `Буруу утгууд: ${invalids.join(", ")}`;
        return;
    }

    const even = numbers.filter(n => n % 2 === 0);
    const odd = numbers.filter(n => n % 2 !== 0);
    document.querySelector("#exercise5 .answer").innerText =
        `Тэгш: ${even.join(", ")} | Сондгой: ${odd.join(", ")}`;
});

// Дасгал 6 - Хаалганы байршил
document.querySelector("#exercise6 button").addEventListener("click", () => { 
    const number = parseInt(document.querySelector("#exercise6 input").value);
    const apartmentsPerFloor = 4; // Давхар бүрийн айлын тоо
    const floorsPerEntrance = 9;  // Орц бүрийн давхарын тоо
    const entrances = 3;          // Орцны тоо
    const totalApartments = apartmentsPerFloor * floorsPerEntrance * entrances; // Нийт орон сууцны тоо

    // Хэрэв оруулсан дугаар хэт их байвал
    if (number < 1 || number > totalApartments) {
        document.querySelector("#exercise6 .answer").innerText = "Буруу хаалганы дугаар оруулсан байна.";
        return;
    }

    const apartmentPerEntrance = apartmentsPerFloor * floorsPerEntrance; // Орц бүрт байгаа айлын тоо
    const entrance = Math.ceil(number / apartmentPerEntrance);           // Орц
    const insideEntranceNumber = number - (entrance - 1) * apartmentPerEntrance; // Орц доторх дугаар
    const floor = Math.ceil(insideEntranceNumber / apartmentsPerFloor); // Давхар
    const door = ((insideEntranceNumber - 1) % apartmentsPerFloor) + 1; // Хаалга

    // Хариулт
    document.querySelector("#exercise6 .answer").innerText =
        `Орц: ${entrance}, Давхар: ${floor}, Хаалга: ${door}`;
});


// Дасгал 7 - Цагийн дагуу дүрс байрлуулах
window.addEventListener("DOMContentLoaded", () => {
    const hour = new Date().getHours();
    const box = document.createElement("div");

    box.style.width = "50px";
    box.style.height = "50px";
    box.style.position = "fixed";
    box.style.zIndex = "10000";
    box.style.backgroundColor = hour < 12 ? "green" : "red";

    // Байршлыг сонгох
    if (hour < 12) {
        // өглөө — зүүн дээд
        box.style.top = "10px";
        box.style.left = "10px";
    } else {
        // орой — баруун доод
        box.style.bottom = "10px";
        box.style.right = "10px";
    }

    document.body.appendChild(box);
});


// Дасгал 8 - Олимпиадын бодлого
document.querySelector("#exercise8 input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        document.querySelector("#exercise8 button").click();
    }
});

document.querySelector("#exercise8 button").addEventListener("click", () => {
    const input = document.querySelector("#exercise8 input").value;
    const [n, k] = input.split(",").map(v => parseInt(v.trim()));
    
    // Хэрэв орсон утгууд буруу бол
    if (isNaN(n) || isNaN(k) || n <= 0 || k <= 0) {
        document.querySelector("#exercise8 .answer").innerText = "Зөв n болон k утгуудыг оруулна уу.";
        return;
    }
    
    let result = 0;
    for (let i = 1; i <= k; i++) {
        // Петя эхлээд i зоос авсан үед хожих боломжтой эсэх
        if ((n - i) % (k + 1) === 0) {
            result = i;
            break;
        }
    }
    
    // Хариулт
    document.querySelector("#exercise8 .answer").innerText =
        result > 0 ? `Петя эхэндээ ${result} зоос авбал хожно.` : "Хожих боломжгүй.";
});
