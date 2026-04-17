export const SERVER_URL = 'http://localhost:3000';

export const DATE_FORMATS =
   [
      'DD-MM-YYYY',
      'DD/MM/YYYY',
      'YYYY-MM-DD',
      'YYYY/MM/DD',

      'D-MM-YYYY',
      'D/MM/YYYY',
      'YYYY-MM-D',
      'YYYY/MM/D',

      'D-M-YYYY',
      'D/M/YYYY',
      'YYYY-M-D',
      'YYYY/M/D',

      'DD-M-YYYY',
      'DD/M/YYYY',
      'YYYY-M-DD',
      'YYYY/M/DD',

      'DD-MM-YY',
      'DD/MM/YY',
      'YY-MM-DD',
      'YY/MM/DD',

      'D-M-YY',
      'D/M/YY',
      'YY-M-D',
      'YY/M/D'
   ];


export const TIME_FORMATS = [
   'H',
   'HH',
   'H:m',
   'HH:m',
   'H:mm',
   'HH:mm',
   'H:m:s',
   'HH:m:s',
   'HH:mm:s',
   'HH:mm:ss',
   'H:mm:ss',
   'H:m:ss'
];


// Regex Documentation:
//
// ^                             → Start of string
// (?!.*--)                      → Negative lookahead: disallow consecutive hyphens (“--”)
// (?=(?:[^-]*-){0,2}[^-]*$)     → Lookahead: allow at most 2 hyphens in the entire string
//
// (?:                           → Main group of allowed numeric formats:
//   \d{0,4}                     → Up to 4 digits (e.g. "1234")
//   | \d{0,4}-\d{0,2}           → Up to 4 digits, hyphen, up to 2 digits (e.g. "2023-12")
//   | \d{0,2}-\d{0,4}           → Up to 2 digits, hyphen, up to 4 digits (e.g. "12-2023")
//   | \d{0,4}-\d{0,2}-\d{0,2}   → Up to 4 digits, hyphen, up to 2 digits, hyphen, up to 2 digits (e.g. "2023-12-31")
//   | \d{0,2}-\d{0,2}-\d{0,4}   → Up to 2 digits, hyphen, up to 2 digits, hyphen, up to 4 digits (e.g. "12-31-2023")
// )
// -?                            → Optional trailing hyphen
// $                             → End of string
//
// Summary:
// - Matches numeric strings with optional hyphens.
// - No double hyphens allowed.
// - At most 2 hyphens total.
// - Supports formats like YYYY, YYYY-MM, MM-YYYY, YYYY-MM-DD, DD-MM-YYYY.
// - Allows an optional trailing hyphen.
export const DATE_DASH_REG = new RegExp(/^(?!.*--)(?=(?:[^-]*-){0,2}[^-]*$)(?:\d{0,4}|\d{0,4}-\d{0,2}|\d{0,2}-\d{0,4}|\d{0,4}-\d{0,2}-\d{0,2}|\d{0,2}-\d{0,2}-\d{0,4})-?$/);


// Regex Documentation:
//
// ^                              → Start of string
// (?!.*\/\/)                     → Negative lookahead: disallow consecutive slashes (“//”)
// (?=(?:[^/]*\/){0,2}[^/]*$)     → Lookahead: allow at most 2 slashes in the entire string
//
// (?:                            → Main group of allowed numeric formats:
//   \d{0,4}                      → Up to 4 digits (e.g. "1234")
//   | \d{0,4}\/\d{0,2}           → Up to 4 digits, slash, up to 2 digits (e.g. "2023/12")
//   | \d{0,2}\/\d{0,4}           → Up to 2 digits, slash, up to 4 digits (e.g. "12/2023")
//   | \d{0,4}\/\d{0,2}\/\d{0,2}  → Up to 4 digits, slash, up to 2 digits, slash, up to 2 digits (e.g. "2023/12/31")
//   | \d{0,2}\/\d{0,2}\/\d{0,4}  → Up to 2 digits, slash, up to 2 digits, slash, up to 4 digits (e.g. "12/31/2023")
// )
// \/?                            → Optional trailing slash
// $                              → End of string
//
// Summary:
// - Matches numeric strings with optional slashes.
// - No double slashes allowed.
// - At most 2 slashes total.
// - Supports formats like YYYY, YYYY/MM, MM/YYYY, YYYY/MM/DD, DD/MM/YYYY.
// - Allows an optional trailing slash.
export const DATE_SLASH_REG = new RegExp(/^(?!.*\/\/)(?=(?:[^/]*\/){0,2}[^/]*$)(?:\d{0,4}|\d{0,4}\/\d{0,2}|\d{0,2}\/\d{0,4}|\d{0,4}\/\d{0,2}\/\d{0,2}|\d{0,2}\/\d{0,2}\/\d{0,4})\/?$/);

// export function getYears() {
//    const years: number[] = [];
//    for (let year = 1925; year <= 2100; year++)
//       years.push(year);

//    return years;
// }

export const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

export const WEEK_DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const YEARS = [
   1925, 1926, 1927, 1928, 1929, 1930, 1931, 1932, 1933, 1934,
   1935, 1936, 1937, 1938, 1939, 1940, 1941, 1942, 1943, 1944,
   1945, 1946, 1947, 1948, 1949, 1950, 1951, 1952, 1953, 1954,
   1955, 1956, 1957, 1958, 1959, 1960, 1961, 1962, 1963, 1964,
   1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974,
   1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984,
   1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994,
   1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004,
   2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014,
   2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
   2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034,
   2035, 2036, 2037, 2038, 2039, 2040, 2041, 2042, 2043, 2044,
   2045, 2046, 2047, 2048, 2049, 2050, 2051, 2052, 2053, 2054,
   2055, 2056, 2057, 2058, 2059, 2060, 2061, 2062, 2063, 2064,
   2065, 2066, 2067, 2068, 2069, 2070, 2071, 2072, 2073, 2074,
   2075, 2076, 2077, 2078, 2079, 2080, 2081, 2082, 2083, 2084,
   2085, 2086, 2087, 2088, 2089, 2090, 2091, 2092, 2093, 2094,
   2095, 2096, 2097, 2098, 2099, 2100, 2105, 2106, 2107, 2108
];