import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  customers = signal<any[]>([
    {
      "pk": "019b8b29-38e8-70bc-9934-20c8872c7d7c",
      "name": "Jackie Payne",
      "email": "stewartjanice@example.org",
      "phone": "+1-244-258-1979x603",
      "indexCount": 101
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-245990609f4d",
      "name": "John Williams",
      "email": "dawnmcclain@example.com",
      "phone": "9413762560",
      "indexCount": 102
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-29a92d089426",
      "name": "Carl Burch",
      "email": "browndavid@example.com",
      "phone": "+1-303-258-5797x89892",
      "indexCount": 103
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-2d4977920522",
      "name": "James Long",
      "email": "fisherteresa@example.net",
      "phone": "+1-613-389-7955",
      "indexCount": 104
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-3172ff2e04ce",
      "name": "Robin Cox",
      "email": "brianlong@example.com",
      "phone": "+1-748-867-4658x42996",
      "indexCount": 105
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-3747952586f7",
      "name": "John Delacruz",
      "email": "seanhill@example.org",
      "phone": "(750)657-8796x03360",
      "indexCount": 106
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-39c308c716f3",
      "name": "Lynn Benson",
      "email": "nataliepotts@example.org",
      "phone": "(566)661-4470",
      "indexCount": 107
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-3d5481c31c0e",
      "name": "Scott Erickson",
      "email": "anne77@example.com",
      "phone": "001-900-614-8091x52331",
      "indexCount": 108
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-407acb45cbba",
      "name": "Anthony Davies",
      "email": "karen03@example.org",
      "phone": "+1-758-724-8672x296",
      "indexCount": 109
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-471676064aa3",
      "name": "Thomas Aguilar",
      "email": "megan74@example.org",
      "phone": "001-686-619-1884x409",
      "indexCount": 110
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-499d6356f6da",
      "name": "James Jones",
      "email": "campbellkrystal@example.net",
      "phone": "293.459.5031",
      "indexCount": 111
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-4c6d30c8f896",
      "name": "Emily Gibbs",
      "email": "vanessashepard@example.org",
      "phone": "8587339961",
      "indexCount": 112
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-51da762e87bc",
      "name": "Chad Glover",
      "email": "cschroeder@example.org",
      "phone": "206.608.9645x9309",
      "indexCount": 113
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-548101e363a3",
      "name": "Shawn Sherman",
      "email": "michelenguyen@example.org",
      "phone": "001-775-828-9944x75118",
      "indexCount": 114
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-5b3565dc69e1",
      "name": "Eric Bush",
      "email": "james47@example.com",
      "phone": "468-481-5485",
      "indexCount": 115
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-5e23ca64d781",
      "name": "Grace Skinner",
      "email": "dale42@example.com",
      "phone": "285.952.5824",
      "indexCount": 116
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-601b08d947b2",
      "name": "Danielle Hill",
      "email": "beasleygavin@example.org",
      "phone": "785.391.3594x867",
      "indexCount": 117
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-6758a8d28d5c",
      "name": "Sherri Smith",
      "email": "gstout@example.net",
      "phone": "887-728-6312",
      "indexCount": 118
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-6956255dd235",
      "name": "Veronica Johnson",
      "email": "ortizjessica@example.net",
      "phone": "429.268.3374",
      "indexCount": 119
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-6c19ee60e262",
      "name": "Roger Stevenson",
      "email": "turnerkathryn@example.net",
      "phone": "586-924-8004x451",
      "indexCount": 120
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-72edd7c70cbd",
      "name": "Jason Perry",
      "email": "jennifer16@example.com",
      "phone": "+1-369-954-0534x822",
      "indexCount": 121
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-7599c9bce512",
      "name": "Anthony Parker",
      "email": "brandy62@example.org",
      "phone": "362-218-0158",
      "indexCount": 122
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-78afede7bf36",
      "name": "Lynn Bradley",
      "email": "makayla73@example.com",
      "phone": "952-618-9944x71321",
      "indexCount": 123
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-7fb81c295f21",
      "name": "Benjamin Miller",
      "email": "derek75@example.com",
      "phone": "951.666.8866x713",
      "indexCount": 124
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-821b2febb049",
      "name": "Debra Kelly",
      "email": "mendeznicholas@example.org",
      "phone": "+1-548-474-5317",
      "indexCount": 125
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-85b818c1039a",
      "name": "Grant Jackson",
      "email": "michael89@example.com",
      "phone": "(948)462-2434x1810",
      "indexCount": 126
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-8aab3ad46a5c",
      "name": "Pamela Jordan",
      "email": "carol94@example.com",
      "phone": "995.272.3870x84983",
      "indexCount": 127
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-8dfff8bcecba",
      "name": "Kelly Keith",
      "email": "adamsamber@example.com",
      "phone": "880.703.7717",
      "indexCount": 128
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-92cbde926d9d",
      "name": "Melissa Daniel",
      "email": "bpowers@example.com",
      "phone": "(909)341-8665",
      "indexCount": 129
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-94c6dea69f82",
      "name": "Tyrone Jones",
      "email": "destinykline@example.com",
      "phone": "001-646-969-5720x24110",
      "indexCount": 130
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-9a735c2e260b",
      "name": "Mr. Carlos Robinson",
      "email": "philip29@example.org",
      "phone": "001-476-966-0457x1317",
      "indexCount": 131
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-9e9c1d25c366",
      "name": "Karla Meyers",
      "email": "fraziertyrone@example.net",
      "phone": "840-777-2737",
      "indexCount": 132
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-a25dfc0fbda2",
      "name": "Adam Daniels",
      "email": "juliakim@example.com",
      "phone": "549.283.1756x899",
      "indexCount": 133
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-a57f22bfcc0b",
      "name": "Timothy Nicholson",
      "email": "michaelgutierrez@example.org",
      "phone": "677-891-6167",
      "indexCount": 134
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-a802a37fd109",
      "name": "Patricia Gonzalez",
      "email": "ryan36@example.com",
      "phone": "+1-480-632-3728x004",
      "indexCount": 135
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-ae4943c18660",
      "name": "Danielle Jenkins",
      "email": "franksoto@example.org",
      "phone": "(427)239-0254",
      "indexCount": 136
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-b19df14ee9f9",
      "name": "Dylan Grant",
      "email": "jwong@example.org",
      "phone": "878.481.2694x4249",
      "indexCount": 137
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-b51120f58925",
      "name": "Mark Stevenson",
      "email": "nicolecox@example.org",
      "phone": "(904)519-3252x9625",
      "indexCount": 138
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-bb76b5b9e15c",
      "name": "Robert Sherman",
      "email": "huntphilip@example.org",
      "phone": "768-635-1707",
      "indexCount": 139
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-bd7d36f47277",
      "name": "Ethan Hunt",
      "email": "elizabeth97@example.com",
      "phone": "7937370868",
      "indexCount": 140
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-c3e4340fc58f",
      "name": "Kelly Obrien",
      "email": "chrisortiz@example.com",
      "phone": "+1-443-815-5982x2151",
      "indexCount": 141
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-c5ca43ba522b",
      "name": "Michelle Reed",
      "email": "wlittle@example.net",
      "phone": "388.597.4858x4817",
      "indexCount": 142
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-cbaef19a82c5",
      "name": "Jamie Young",
      "email": "sbowers@example.net",
      "phone": "858.567.0110",
      "indexCount": 143
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-ce35a13bf191",
      "name": "Rachael Sullivan",
      "email": "brucejohn@example.org",
      "phone": "+1-855-367-8331x390",
      "indexCount": 144
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-d12d46596c0c",
      "name": "Molly Peterson",
      "email": "ufoster@example.org",
      "phone": "201.742.0578x638",
      "indexCount": 145
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-d40042aea6f2",
      "name": "Felicia Pollard",
      "email": "scotthobbs@example.com",
      "phone": "4538370741",
      "indexCount": 146
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-dacf1a27f15d",
      "name": "Jordan Petersen",
      "email": "cooperjanet@example.org",
      "phone": "645-823-6018x43620",
      "indexCount": 147
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-dc3e21902d31",
      "name": "Amber Rollins",
      "email": "wmoore@example.org",
      "phone": "776-252-2965x1033",
      "indexCount": 148
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-e162231c449f",
      "name": "Crystal Mendez",
      "email": "morenoamy@example.net",
      "phone": "+1-517-219-1729x3917",
      "indexCount": 149
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-e5c07d73ef82",
      "name": "Joseph Miller",
      "email": "nmorrison@example.net",
      "phone": "(574)675-2216",
      "indexCount": 150
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-e80a5eb04f93",
      "name": "Keith Smith",
      "email": "twest@example.org",
      "phone": "(395)552-8300x5002",
      "indexCount": 151
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-ec4586ea232b",
      "name": "Keith Green",
      "email": "grosscrystal@example.net",
      "phone": "001-676-807-1852x30304",
      "indexCount": 152
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-f31474db9653",
      "name": "Paul Robles",
      "email": "lcaldwell@example.net",
      "phone": "+1-488-475-1399x1905",
      "indexCount": 153
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-f7d6b4cad8e4",
      "name": "Edward Jones",
      "email": "monicaanderson@example.org",
      "phone": "484.241.4688x5712",
      "indexCount": 154
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-fbae6cfd1527",
      "name": "Katherine Logan",
      "email": "hamptonpaul@example.org",
      "phone": "001-630-710-0047x044",
      "indexCount": 155
    },
    {
      "pk": "019b8b29-38e8-70bc-9934-fd074bc67496",
      "name": "Mark Salazar",
      "email": "laurenlopez@example.net",
      "phone": "(744)747-2841x705",
      "indexCount": 156
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-024a818af0c1",
      "name": "Douglas Prince",
      "email": "qbryant@example.net",
      "phone": "886-338-9773x295",
      "indexCount": 157
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-0434e3cb93c4",
      "name": "Thomas Wall",
      "email": "christophermathis@example.net",
      "phone": "319.289.2020x979",
      "indexCount": 158
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-0bbb85442c42",
      "name": "Luis Nelson",
      "email": "mullinsjessica@example.org",
      "phone": "(442)359-9162x3776",
      "indexCount": 159
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-0efcf48518db",
      "name": "Angela Blair",
      "email": "wendy57@example.org",
      "phone": "+1-481-669-4475",
      "indexCount": 160
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-101a92d973dc",
      "name": "Patrick Erickson",
      "email": "davislaura@example.org",
      "phone": "635.764.1382x725",
      "indexCount": 161
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-15097c550c15",
      "name": "Tyler Gonzalez",
      "email": "wangwilliam@example.org",
      "phone": "955.437.4383x4294",
      "indexCount": 162
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-1ac1e260945b",
      "name": "Scott Robinson",
      "email": "tdiaz@example.net",
      "phone": "001-598-566-6493x5444",
      "indexCount": 163
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-1e0685dfd997",
      "name": "Evan Duffy",
      "email": "marcsmith@example.net",
      "phone": "815-896-0161x98166",
      "indexCount": 164
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-2076e5f28b7a",
      "name": "Walter Barrett",
      "email": "jharper@example.net",
      "phone": "+1-446-805-4979",
      "indexCount": 165
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-27282b5c4c18",
      "name": "Peter Martin",
      "email": "rita83@example.org",
      "phone": "238-933-1542",
      "indexCount": 166
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-2887a64383b2",
      "name": "Angela Ross",
      "email": "ochoabrittany@example.org",
      "phone": "4906832902",
      "indexCount": 167
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-2c9ff205585d",
      "name": "Donald Lopez",
      "email": "eric19@example.com",
      "phone": "3686871770",
      "indexCount": 168
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-322b1bfaeee1",
      "name": "Ralph King",
      "email": "rubioveronica@example.com",
      "phone": "732-586-7143",
      "indexCount": 169
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-36117efcb647",
      "name": "James Lucas",
      "email": "ashleybyrd@example.org",
      "phone": "211-237-5294x861",
      "indexCount": 170
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-39e9e1de9c0c",
      "name": "Patrick Page",
      "email": "ggross@example.com",
      "phone": "+1-463-547-3828x68445",
      "indexCount": 171
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-3c7e3b2dd5b4",
      "name": "Austin Long",
      "email": "jacob78@example.com",
      "phone": "(444)687-1932x82556",
      "indexCount": 172
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-4213856246de",
      "name": "Sherri Maldonado",
      "email": "jessicabowers@example.com",
      "phone": "909-612-7777x7108",
      "indexCount": 173
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-440506e4790f",
      "name": "Michael Velez",
      "email": "meyerricardo@example.com",
      "phone": "001-625-497-1384",
      "indexCount": 174
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-48b424f2585b",
      "name": "Sarah Roberson",
      "email": "johnsonsabrina@example.com",
      "phone": "405-220-1042x56258",
      "indexCount": 175
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-4e299af9febd",
      "name": "Hunter Wallace",
      "email": "yatescheyenne@example.com",
      "phone": "398-340-3554x4986",
      "indexCount": 176
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-52236d25aa79",
      "name": "Nicholas Fowler",
      "email": "dawncarter@example.net",
      "phone": "816-838-6815x7182",
      "indexCount": 177
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-57247ac87606",
      "name": "Diane Lane",
      "email": "merrittashley@example.net",
      "phone": "001-761-612-9732x83967",
      "indexCount": 178
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-5b92ecfd0c32",
      "name": "Jason Hanson",
      "email": "stokeskristin@example.com",
      "phone": "740.393.3265x772",
      "indexCount": 179
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-5d85c1bace08",
      "name": "Daniel Hernandez",
      "email": "wardmichelle@example.com",
      "phone": "001-436-302-5750x1933",
      "indexCount": 180
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-617ccaf5480e",
      "name": "Heather Marshall DVM",
      "email": "maria29@example.org",
      "phone": "828.992.3748x24354",
      "indexCount": 181
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-65d2ddcb1701",
      "name": "Matthew Cruz",
      "email": "asanchez@example.com",
      "phone": "435-731-2663",
      "indexCount": 182
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-682f27370b37",
      "name": "Andrew Caldwell",
      "email": "ronaldconley@example.org",
      "phone": "472.578.5440x99849",
      "indexCount": 183
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-6e93e6e588eb",
      "name": "Stuart Cooper",
      "email": "jasonburke@example.org",
      "phone": "+1-647-903-3826x302",
      "indexCount": 184
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-731bb2d69e90",
      "name": "Robert Pierce",
      "email": "manueljackson@example.com",
      "phone": "001-714-718-9706x8391",
      "indexCount": 185
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-743616d4a037",
      "name": "Brenda Nelson",
      "email": "riveramatthew@example.org",
      "phone": "852.232.5861",
      "indexCount": 186
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-7b95fe2351ec",
      "name": "George Harris",
      "email": "vmejia@example.com",
      "phone": "854.611.9115x93181",
      "indexCount": 187
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-7f32e2d215e3",
      "name": "David Ward",
      "email": "valenciadiane@example.org",
      "phone": "561-205-6420x094",
      "indexCount": 188
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-81a530230f34",
      "name": "Brooke Ellis",
      "email": "mark81@example.net",
      "phone": "+1-210-536-6178x72051",
      "indexCount": 189
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-87dcc7ccf3d6",
      "name": "Warren Williams",
      "email": "peggy41@example.com",
      "phone": "+1-497-969-3404x844",
      "indexCount": 190
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-8ae6f651d7e2",
      "name": "Matthew Hickman",
      "email": "gallegosjohn@example.net",
      "phone": "001-950-992-2665x2363",
      "indexCount": 191
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-8c6072726eb3",
      "name": "Alexis Rogers",
      "email": "jenna52@example.org",
      "phone": "+1-231-450-7572x87300",
      "indexCount": 192
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-905e7f25cf9e",
      "name": "Donna Mendez",
      "email": "cabreracalvin@example.com",
      "phone": "8849358473",
      "indexCount": 193
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-96081f33cee6",
      "name": "Julie Haynes",
      "email": "wjones@example.org",
      "phone": "369-783-3855x85793",
      "indexCount": 194
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-9a6f0cba6648",
      "name": "Ann Rojas",
      "email": "irobles@example.org",
      "phone": "(947)964-4152",
      "indexCount": 195
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-9d8e10fd42c1",
      "name": "Alyssa Jackson",
      "email": "charlenekennedy@example.org",
      "phone": "001-227-982-5866",
      "indexCount": 196
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-a3277f87d4bb",
      "name": "Brittany Rodgers",
      "email": "ufriedman@example.net",
      "phone": "001-978-721-2471x7215",
      "indexCount": 197
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-a780501da579",
      "name": "Robert Young",
      "email": "colleenjackson@example.org",
      "phone": "391.929.9382x846",
      "indexCount": 198
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-ab0ea0dd9757",
      "name": "Christopher Weaver",
      "email": "lewispamela@example.org",
      "phone": "+1-703-750-3560x75016",
      "indexCount": 199
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-aeb0d4566aa5",
      "name": "Madison Brooks",
      "email": "nielsendiana@example.net",
      "phone": "253.433.7023",
      "indexCount": 200
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-b1a6d817a8d5",
      "name": "Louis Black",
      "email": "michael72@example.net",
      "phone": "(958)430-0119x619",
      "indexCount": 201
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-b5a9961b4076",
      "name": "John Walker",
      "email": "bakerabigail@example.com",
      "phone": "+1-878-421-3490x52702",
      "indexCount": 202
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-bb41b8d23336",
      "name": "Mark Duncan",
      "email": "sarah90@example.net",
      "phone": "695-653-8926x5708",
      "indexCount": 203
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-bc888342b35f",
      "name": "Andrew Watkins",
      "email": "smitchell@example.com",
      "phone": "001-996-888-1004x389",
      "indexCount": 204
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-c2eb873ecbbd",
      "name": "Karen Christian",
      "email": "zellison@example.org",
      "phone": "(639)394-0861x096",
      "indexCount": 205
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-c6c4c99e2b78",
      "name": "Jamie Zimmerman",
      "email": "ehood@example.com",
      "phone": "001-755-654-1889x235",
      "indexCount": 206
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-ca1a624a75e1",
      "name": "David Wall",
      "email": "morenovalerie@example.com",
      "phone": "815.861.9811x14318",
      "indexCount": 207
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-cc75f08bd533",
      "name": "David Castillo",
      "email": "breanna39@example.com",
      "phone": "260.613.5308x13972",
      "indexCount": 208
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-d0235c6302b3",
      "name": "Ashley Carter",
      "email": "williamssherry@example.com",
      "phone": "217.966.1547x34432",
      "indexCount": 209
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-d718d7d8d2c3",
      "name": "Vicki Miller",
      "email": "alexandergreen@example.com",
      "phone": "(920)239-9287x7474",
      "indexCount": 210
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-dbc38336531d",
      "name": "Kathryn Garrett",
      "email": "alexandriapatel@example.com",
      "phone": "875.743.6627x74715",
      "indexCount": 211
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-dddba2c1a353",
      "name": "Robert Torres",
      "email": "smoss@example.net",
      "phone": "+1-767-671-5025x917",
      "indexCount": 212
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-e0108ae5935d",
      "name": "Leslie Cooper",
      "email": "jamesshelton@example.net",
      "phone": "+1-518-852-8195x8513",
      "indexCount": 213
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-e67bf9bf5b25",
      "name": "Larry Navarro",
      "email": "allenandrew@example.org",
      "phone": "+1-410-988-8555x339",
      "indexCount": 214
    },
    {
      "pk": "019b8b29-38e8-70bc-9935-e879255854f4",
      "name": "Dale Hartman",
      "email": "george05@example.com",
      "phone": "413.491.1208x7663",
      "indexCount": 215
    },
    {
      "pk": "019b8b29-38e9-7778-a307-ad4c305b1851",
      "name": "Mrs. Alison Walsh",
      "email": "eric33@example.net",
      "phone": "001-231-889-5564x63616",
      "indexCount": 216
    },
    {
      "pk": "019b8b29-38e9-7778-a307-b0b9bbe4afb0",
      "name": "Blake Larsen",
      "email": "robin83@example.net",
      "phone": "+1-619-974-5049",
      "indexCount": 217
    },
    {
      "pk": "019b8b29-38e9-7778-a307-b54d41fed7d4",
      "name": "Edward Carr",
      "email": "robert33@example.org",
      "phone": "001-251-582-6069x467",
      "indexCount": 218
    },
    {
      "pk": "019b8b29-38e9-7778-a307-b8bea19f9359",
      "name": "Sally Bryan",
      "email": "penningtonmicheal@example.org",
      "phone": "001-254-778-5060x1671",
      "indexCount": 219
    },
    {
      "pk": "019b8b29-38e9-7778-a307-bf9a5bf9d403",
      "name": "Sara Armstrong",
      "email": "houstonedgar@example.com",
      "phone": "420.561.6482",
      "indexCount": 220
    },
    {
      "pk": "019b8b29-38e9-7778-a307-c13a0d1981c0",
      "name": "Joshua Ward",
      "email": "dlee@example.net",
      "phone": "001-738-605-2678x06507",
      "indexCount": 221
    },
    {
      "pk": "019b8b29-38e9-7778-a307-c792ef44790d",
      "name": "Jessica Walker",
      "email": "qwright@example.com",
      "phone": "001-906-489-1404x319",
      "indexCount": 222
    },
    {
      "pk": "019b8b29-38e9-7778-a307-c8cf13f10ede",
      "name": "Maria Lynn",
      "email": "ryanknight@example.com",
      "phone": "+1-603-887-8763x29258",
      "indexCount": 223
    },
    {
      "pk": "019b8b29-38e9-7778-a307-cd34c85b064e",
      "name": "Madeline Barnett",
      "email": "christopherpope@example.com",
      "phone": "+1-787-221-6740x643",
      "indexCount": 224
    }
  ]);

  customers1 = signal<any[]>([
    {
      "pk": 1,
      "name": "Jackie Payne",
      "email": "stewartjanice@example.org",
      "phone": "+1-244-258-1979x603",
      "indexCount": 101
    },
    {
      "pk": 2,
      "name": "John Williams",
      "email": "dawnmcclain@example.com",
      "phone": "9413762560",
      "indexCount": 102
    },
    {
      "pk": 3,
      "name": "Carl Burch",
      "email": "browndavid@example.com",
      "phone": "+1-303-258-5797x89892",
      "indexCount": 103
    },
    {
      "pk": 4,
      "name": "James Long",
      "email": "fisherteresa@example.net",
      "phone": "+1-613-389-7955",
      "indexCount": 104
    },
    {
      "pk": 5,
      "name": "Robin Cox",
      "email": "brianlong@example.com",
      "phone": "+1-748-867-4658x42996",
      "indexCount": 105
    }
  ]);
}
