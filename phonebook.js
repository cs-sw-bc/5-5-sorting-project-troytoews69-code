let phoneBook = [
  { name: "Jasmine", phone: "4165559999", city: "Detroit" },
  { name: "Dan", phone: "6475551234", city: "Calgary" },
  { name: "Cory", phone: "9051112222", city: "Caledonia" },
  { name: "Wilmer", phone: "4378887777", city: "Wilmington" },
  { name: "Amina", phone: "2895551001", city: "Ajax" },
  { name: "Brian", phone: "5195551002", city: "London" },
  { name: "Carla", phone: "2265551003", city: "Windsor" },
  { name: "Derek", phone: "7055551004", city: "Barrie" },
  { name: "Elena", phone: "6135551005", city: "Ottawa" },
  { name: "Farah", phone: "8075551006", city: "Thunder Bay" },
  { name: "Gavin", phone: "9055551007", city: "Hamilton" },
  { name: "Holly", phone: "3655551008", city: "Brampton" },
  { name: "Isaac", phone: "2495551009", city: "Sudbury" },
  { name: "Jared", phone: "5485551010", city: "Kitchener" },
  { name: "Kiana", phone: "3435551011", city: "Kingston" },
  { name: "Liam", phone: "6475551012", city: "Toronto" },
  { name: "Maya", phone: "4375551013", city: "Mississauga" },
  { name: "Noah", phone: "2895551014", city: "Oakville" },
  { name: "Olivia", phone: "4165551015", city: "Markham" },
  { name: "Parker", phone: "9055551016", city: "Burlington" },
  { name: "Quinn", phone: "6135551017", city: "Kanata" },
  { name: "Renee", phone: "5195551018", city: "Guelph" },
  { name: "Soren", phone: "7055551019", city: "Orillia" },
  { name: "Talia", phone: "8075551020", city: "Kenora" },
  { name: "Uma", phone: "2265551021", city: "Chatham" },
  { name: "Vince", phone: "3655551022", city: "Vaughan" },
  { name: "Willa", phone: "5485551023", city: "Cambridge" },
  { name: "Xander", phone: "2495551024", city: "North Bay" },
  { name: "Yara", phone: "3435551025", city: "Brockville" },
  { name: "Zane", phone: "2895551026", city: "Milton" },
];

function addEntry(book, entry) {
  book.push(entry);
}

function updateEntry(book, name, newData) {
  for (let index = 0; index < book.length; index++) {
    if (book[index].name === name) {
      if (newData.name !== undefined) {
        book[index].name = newData.name;
      }
      if (newData.phone !== undefined) {
        book[index].phone = newData.phone;
      }
      if (newData.city !== undefined) {
        book[index].city = newData.city;
      }
      return true;
    }
  }
  return false;
}

function deleteEntry(book, name) {
  for (let index = 0; index < book.length; index++) {
    if (book[index].name === name) {
      book.splice(index, 1);
      return true;
    }
  }
  return false;
}

// Bubble Sort (in-place):
// - Outer loop controls how many passes are made.
// - Inner loop compares adjacent names on each pass.
// - If left name is greater than right name, swap entire objects.
// - After each pass, the largest unsorted name moves to the end.
function bubbleSortByName(book) {
  for (let outer = 0; outer < book.length - 1; outer++) {
    for (let inner = 0; inner < book.length - 1 - outer; inner++) {
      if (book[inner].name > book[inner + 1].name) {
        const temp = book[inner];
        book[inner] = book[inner + 1];
        book[inner + 1] = temp;
      }
    }
  }
}

// Selection Sort (in-place):
// - Outer loop sets the position to fill.
// - Inner loop finds the smallest phone in the remaining range.
// - Phones are converted to Number before comparison.
// - One swap places the smallest found item into the current position.
function selectionSortByPhone(book) {
  for (let outer = 0; outer < book.length - 1; outer++) {
    let minIndex = outer;

    for (let inner = outer + 1; inner < book.length; inner++) {
      const currentPhone = Number(book[inner].phone);
      const minPhone = Number(book[minIndex].phone);

      if (currentPhone < minPhone) {
        minIndex = inner;
      }
    }

    if (minIndex !== outer) {
      const temp = book[outer];
      book[outer] = book[minIndex];
      book[minIndex] = temp;
    }
  }
}

function merge(left, right) {
  const merged = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex].name <= right[rightIndex].name) {
      merged.push(left[leftIndex]);
      leftIndex++;
    } else {
      merged.push(right[rightIndex]);
      rightIndex++;
    }
  }

  while (leftIndex < left.length) {
    merged.push(left[leftIndex]);
    leftIndex++;
  }

  while (rightIndex < right.length) {
    merged.push(right[rightIndex]);
    rightIndex++;
  }

  return merged;
}

// Merge Sort (returns new array):
// - Recursively split the array into halves until size 1.
// - Merge two sorted halves by repeatedly taking the smaller front name.
// - Merge uses loops; recursion handles divide-and-conquer structure.
// - Original input is not mutated because slices/new arrays are used.
function mergeSortByName(book) {
  if (book.length <= 1) {
    return book.slice();
  }

  const middle = Math.floor(book.length / 2);
  const leftHalf = book.slice(0, middle);
  const rightHalf = book.slice(middle);

  const sortedLeft = mergeSortByName(leftHalf);
  const sortedRight = mergeSortByName(rightHalf);

  return merge(sortedLeft, sortedRight);
}

if (require.main === module) {
  addEntry(phoneBook, { name: "Avery", phone: "5195557777", city: "Waterloo" });
  updateEntry(phoneBook, "Dan", { city: "Edmonton" });
  deleteEntry(phoneBook, "Xander");

  const bubbleSortedBook = [...phoneBook];
  bubbleSortByName(bubbleSortedBook);

  const selectionSortedBook = [...phoneBook];
  selectionSortByPhone(selectionSortedBook);

  const mergeSortedBook = mergeSortByName(phoneBook);

  console.log(
    "PhoneBook ready:",
    phoneBook.length,
    "entries | first:",
    bubbleSortedBook[0].name,
    "| last:",
    mergeSortedBook[mergeSortedBook.length - 1].name,
    "| smallest phone:",
    selectionSortedBook[0].phone
  );
}

// Reflection Answers:
// 1) Easiest to implement: Bubble sort, because it uses a direct adjacent comparison and swap pattern.
// 2) Hardest to understand: Merge sort, because recursion plus merging two sorted halves adds more moving parts.
// 3) Algorithms that modify original array: Bubble sort and selection sort (both are in-place).
// 4) Algorithm that returns a new array: Merge sort in this implementation.
// 5) Main structural difference: Merge sort splits the array recursively and then combines results,
//    while bubble and selection sort iterate directly over one array with nested loops.

module.exports = {
  phoneBook,
  addEntry,
  updateEntry,
  deleteEntry,
  bubbleSortByName,
  selectionSortByPhone,
  mergeSortByName,
  merge,
};
