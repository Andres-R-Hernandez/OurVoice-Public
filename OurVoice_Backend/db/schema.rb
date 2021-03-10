# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_03_09_142353) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "constituents", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "representative_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["representative_id"], name: "index_constituents_on_representative_id"
    t.index ["user_id"], name: "index_constituents_on_user_id"
  end

  create_table "polloptions", force: :cascade do |t|
    t.string "description"
    t.bigint "poll_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["poll_id"], name: "index_polloptions_on_poll_id"
  end

  create_table "polls", force: :cascade do |t|
    t.string "issue"
    t.string "category"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "representatives", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "rpjoiners", force: :cascade do |t|
    t.bigint "poll_id", null: false
    t.bigint "representative_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["poll_id"], name: "index_rpjoiners_on_poll_id"
    t.index ["representative_id"], name: "index_rpjoiners_on_representative_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password_digest"
    t.date "date_of_birth"
    t.string "address"
    t.string "city"
    t.string "state"
    t.string "zip_code"
    t.string "gender"
    t.string "party"
    t.string "occupation"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "ethnicity"
  end

  create_table "votes", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "poll_id", null: false
    t.bigint "polloption_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["poll_id"], name: "index_votes_on_poll_id"
    t.index ["polloption_id"], name: "index_votes_on_polloption_id"
    t.index ["user_id"], name: "index_votes_on_user_id"
  end

  add_foreign_key "constituents", "representatives"
  add_foreign_key "constituents", "users"
  add_foreign_key "polloptions", "polls"
  add_foreign_key "rpjoiners", "polls"
  add_foreign_key "rpjoiners", "representatives"
  add_foreign_key "votes", "polloptions"
  add_foreign_key "votes", "polls"
  add_foreign_key "votes", "users"
end
