# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Vote.destroy_all
Polloption.destroy_all
Rpjoiner.destroy_all
Constituent.destroy_all
Poll.destroy_all
Representative.destroy_all
User.destroy_all


user1 = User.create(
    name: "Will",
    email: "email@gmail.com",
    password: "password",
    date_of_birth: "09/25/1968",
    address: "251 North Bristol Avenue",
    city: "Los Angeles",
    state: "California",
    zip_code: "90049",
    ethnicity: "Black",
    gender: "Male",
    party: "Democratic",
    occupation: "NBA Player"
)

rep1 = Representative.create(
    name: "Texas State House district 51",
)
rep2 = Representative.create(
    name: "Travis County TX Commissioners Court District 4",
)
rep3 = Representative.create(
    name: "Texas's 21st congressional district",
)
rep4 = Representative.create(
    name: "Austin city",
)
rep5 = Representative.create(
    name: "United States",
)
rep6 = Representative.create(
    name: "TX State District Court - 4th District",
)
rep7 = Representative.create(
    name: "Texas",
)
rep8 = Representative.create(
    name: "Travis County",
)
rep9 = Representative.create(
    name: "Texas State Senate district 14",
)
rep10 = Representative.create(
    name: "Austin TX city council district 9 (effective Jan 2015)"
)

rep11 = Representative.create(
    name: "Los Angeles city"
)

rep12 = Representative.create(
    name: "California"
)

poll1 = Poll.create(
    issue: "Who has better hair?",
    category: "Misc",
    representatives: [rep5]
)
poption1 = Polloption.create(poll: poll1, description: "Donald Trump")
poption2 = Polloption.create(poll: poll1, description: "Barrack Obama")
poption3 = Polloption.create(poll: poll1, description: "Hillary Clinton")
poption4 = Polloption.create(poll: poll1, description: "Mitch McConnell")

poll2 = Poll.create(
    issue: "Who is the best wrestler?",
    category: "Important",
    representatives: [rep5, rep7]
)
poption5 = Polloption.create(poll: poll2, description: "The Rock")
poption6 = Polloption.create(poll: poll2, description: "Stone Cold Steve Austin")
poption7 = Polloption.create(poll: poll2, description: "Shawn Michaels")
poption8 = Polloption.create(poll: poll2, description: "The Undertaker")

poll3 = Poll.create(
    issue: "What is a computer?",
    category: "Restricted",
    representatives: [rep5]
)
poption9 = Polloption.create(poll: poll3, description: "God")
poption10 = Polloption.create(poll: poll3, description: "Machine")
poption11 = Polloption.create(poll: poll3, description: "Man")
poption12 = Polloption.create(poll: poll3, description: "Everything")

poll4 = Poll.create(
    issue: "What is your opinion on the current President's actions in Syria?",
    category: "National",
    representatives: [rep5]
)
poption13 = Polloption.create(poll: poll4, description: "Favorable")
poption14 = Polloption.create(poll: poll4, description: "Unfavorable")
poption15 = Polloption.create(poll: poll4, description: "I don't know what happened")
poption16 = Polloption.create(poll: poll4, description: "Unsure")

poll5 = Poll.create(
    issue: "Is Mars exploration a top priority for humans?",
    category: "World",
    representatives: [rep5, rep8]
)
poption17 = Polloption.create(poll: poll5, description: "Yes")
poption18 = Polloption.create(poll: poll5, description: "No")
poption19 = Polloption.create(poll: poll5, description: "Unsure")

poll6 = Poll.create(
    issue: "Do you agree with the Austin camping ban?",
    category: "Austin",
    representatives: [rep4, rep8, rep10]
)
poption20 = Polloption.create(poll: poll6, description: "Yes")
poption21 = Polloption.create(poll: poll6, description: "No")
poption22 = Polloption.create(poll: poll6, description: "Yes, but there is a better solution")
poption23 = Polloption.create(poll: poll6, description: "No, but there is no better solution")
poption24 = Polloption.create(poll: poll6, description: "Unsure")

poll7 = Poll.create(
    issue: "Was the January 6th, 2021 violence at the Capital justified?",
    category: "National",
    representatives: [rep5]
)
poption25 = Polloption.create(poll: poll7, description: "Yes")
poption26 = Polloption.create(poll: poll7, description: "No")
poption27 = Polloption.create(poll: poll7, description: "Unsure")

poll8 = Poll.create(
    issue: "What color should Mayor Steve Adler dye his hair?",
    category: "Fun",
    representatives: [rep4, rep8, rep10]
)
poption28 = Polloption.create(poll: poll8, description: "Red River")
poption29 = Polloption.create(poll: poll8, description: "Burnt Orange")
poption30 = Polloption.create(poll: poll8, description: "Sunset Yellow")
poption31 = Polloption.create(poll: poll8, description: "Blues on the Green")
poption32 = Polloption.create(poll: poll8, description: "Violet Crown")

poll9 = Poll.create(
    issue: "Is Citizens United a threat to Democracy?",
    category: "National",
    representatives: [rep5]
)
poption33 = Polloption.create(poll: poll9, description: "Yes")
poption34 = Polloption.create(poll: poll9, description: "No")
poption35 = Polloption.create(poll: poll9, description: "Unsure")

poll10 = Poll.create(
    issue: "Of the following choices, who is the best web developer?",
    category: "Important",
    representatives: [rep5]
)
poption36 = Polloption.create(poll: poll10, description: "Andres")
poption37 = Polloption.create(poll: poll10, description: "Other")

poll11 = Poll.create(
    issue: "Has LAPD violated your rights in the past 6 months?",
    category: "LA",
    representatives: [rep11]
)
poption38 = Polloption.create(poll: poll11, description: "Yes")
poption39 = Polloption.create(poll: poll11, description: "No")
poption40 = Polloption.create(poll: poll11, description: "I prefer not to answer")

poll12 = Poll.create(
    issue: "Was Arnold Schwarzenegger the best governator ever?",
    category: "Governator",
    representatives: [rep12]
)
poption41 = Polloption.create(poll: poll12, description: "Yes")
poption42 = Polloption.create(poll: poll12, description: "No")
poption43 = Polloption.create(poll: poll12, description: "Arnold was not a governor of Californina")
poption44 = Polloption.create(poll: poll12, description: "I dont know who that is")

