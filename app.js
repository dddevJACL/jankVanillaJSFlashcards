(function () {
    var DELIMITER = ',';
    var NEWLINE = '\n';
    var qRegex = /^"|"$/g;
    var i = document.getElementById('file');
    var table = document.getElementById('table');

    if (!i) {
        return;
    }

    i.addEventListener('change', function () {
        if (!!i.files && i.files.length > 0) {
            parseCSV(i.files[0]);
        }
    });

    function parseCSV(file) {
        if (!file || !FileReader) {
            return;
        }

        var reader = new FileReader();

        reader.onload = function (e) {
            toTable(e.target.result);
        };

        reader.readAsText(file);
    }

    function toTable(text) {
        if (!text || !table) {
            return;
        }

        // clear table
        while (!!table.lastElementChild) {
            table.removeChild(table.lastElementChild);
        }

        var rows = text.split(NEWLINE);
        var headers = rows.shift().trim().split(DELIMITER);
        var htr = document.createElement('tr');
        var y = 0;
        headers.forEach(function (h) {
            var th = document.createElement('th');
            th.id = y;
            if (y % 2 == 0) {
                th.addEventListener("click", function() {
                    console.log(th.id)
                    var answer = document.getElementById((parseInt(th.id) + 1).toString());
                    if(answer.style.display === "none") {
                        answer.style.display = "block";
                    } else {
                        answer.style.display = "none";
                    }
                })
            } else {
                th.style.display = "none";
            }
            var ht = h.trim();

            if (!ht) {
                return;
            }

            th.innerHTML = ht.replace(qRegex, '');
            htr.appendChild(th);
            y++;
        });

        table.appendChild(htr);

        var rtr;
        var x = 2;
        rows.forEach(function (r) {
            r = r.trim();

            if (!r) {
                return;
            }

            var cols = r.split(DELIMITER);

            if (cols.length === 0) {
                return;
            }

            rtr = document.createElement('tr');
            
            cols.forEach(function (c) {
                var td = document.createElement('td');
                td.id = x;
                if (x % 2 == 0) {
                    td.addEventListener("click", function() {
                        console.log(td.id)
                        var answers = document.getElementById((parseInt(td.id) + 1).toString());
                        if(answers.style.display === "none") {
                            answers.style.display = "block";
                        } else {
                            answers.style.display = "none";
                        }
                    })
                } else {
                    td.style.display = "none";
                }
                var tc = c.trim();

                td.innerHTML = tc.replace(qRegex, '');
                rtr.appendChild(td);
                x++;
            });

            table.appendChild(rtr);
        });
    }
})();