/* =========================================================================
   WORKOUT DATA — this is the only file you need to edit to change your program.
   -------------------------------------------------------------------------
   Exercise fields:
     name     (required) exercise name
     sets     (optional) e.g. "3 x 8-10"
     rest     (optional) e.g. "2-3 min"   (omit on the first half of a superset)
     cue      (optional) short form/technique reminder
     shoulder (optional) true = flagged with a SHOULDER CARE badge
   Days: add/remove objects in DAYS; tabs are generated automatically.
   ========================================================================= */

// Shared warm-up. Shown as reference on the Notes tab (not a checkable list).
const WARMUP = [
  { name: "Arm circles",                 sets: "30 sec each direction" },
  { name: "Band pull-aparts",            sets: "2 x 15" },
  { name: "Light external rotation",     sets: "2 x 15" },
  { name: "Scapular push-ups",           sets: "2 x 10" },
  { name: "Light warm-up set of first lift", sets: "1 set" }
];

const DAYS = [
  {
    id: "upperA",
    tab: "Upper A",
    title: "Chest & Row Focus",
    exercises: [
      { name: "Flat Dumbbell Bench Press", sets: "3 x 6-10", rest: "2-3 min",
        cue: "Elbows ~45 degrees, stop at comfortable depth, neutral grip if shoulder twinges",
        shoulder: true },
      { name: "Chest-Supported Dumbbell Row", sets: "3 x 8-10", rest: "2 min",
        cue: "Chest on 30-45 degree incline bench, row to hips" },
      { name: "Incline Dumbbell Press", sets: "3 x 8-12", rest: "2 min",
        cue: "30 degree incline, no deep stretch", shoulder: true },
      { name: "Lat Pulldown", sets: "3 x 10-12", rest: "90 sec",
        cue: "Pull to upper chest. Sub pull-ups when fresh" },
      { name: "A1: Cable Lateral Raise", sets: "3 x 12-15",
        cue: "Straight into A2, no rest", shoulder: true },
      { name: "A2: Face Pull", sets: "3 x 12-15", rest: "90 sec",
        cue: "External rotate at the end" },
      { name: "B1: Dumbbell Curl", sets: "2 x 10-12",
        cue: "Straight into B2, no rest. Last set to failure" },
      { name: "B2: Rope Pushdown", sets: "2 x 10-12", rest: "90 sec",
        cue: "Last set to failure" }
    ]
  },
  {
    id: "lowerA",
    tab: "Lower A",
    title: "Squat & Hinge",
    exercises: [
      { name: "Goblet Squat", sets: "3 x 8-12", rest: "2-3 min",
        cue: "Heavy DB at chest. Graduate to 2 DBs at shoulders" },
      { name: "Dumbbell Romanian Deadlift", sets: "3 x 8-10", rest: "2 min",
        cue: "Hips back, stop before lower back rounds" },
      { name: "Dumbbell Walking Lunge", sets: "2 x 10 / leg", rest: "2 min" },
      { name: "Seated Leg Curl", sets: "3 x 10-12", rest: "90 sec",
        cue: "2-sec negative" },
      { name: "Standing Calf Raise", sets: "4 x 10-15", rest: "60 sec",
        cue: "1-sec pause at bottom stretch" },
      { name: "Cable Crunch", sets: "3 x 10-15", rest: "60 sec" }
    ]
  },
  {
    id: "upperB",
    tab: "Upper B",
    title: "Shoulders & Vertical Pull",
    exercises: [
      { name: "Seated Dumbbell Shoulder Press", sets: "3 x 6-10", rest: "2-3 min",
        cue: "Neutral grip, stop at ear level", shoulder: true },
      { name: "Pull-Up", sets: "3 x 6-10", rest: "2-3 min",
        cue: "Band-assisted or pulldown until 6 strict. Add weight past 3x10" },
      { name: "Cable Chest Flye", sets: "3 x 10-12", rest: "90 sec",
        cue: "Stop stretch where the shoulder is happy. Sub deficit push-ups",
        shoulder: true },
      { name: "One-Arm Dumbbell Row", sets: "3 x 8-10 / side", rest: "90 sec",
        cue: "Big range, elbow to hip" },
      { name: "A1: Dumbbell Lateral Raise", sets: "3 x 12-15",
        cue: "Straight into A2, no rest", shoulder: true },
      { name: "A2: Rear-Delt Dumbbell Flye", sets: "3 x 12-15", rest: "90 sec",
        cue: "Chest-supported on incline bench, light and strict" },
      { name: "B1: Incline Dumbbell Curl", sets: "2 x 10-12",
        cue: "Straight into B2, no rest" },
      { name: "B2: Overhead Cable Triceps Extension", sets: "2 x 10-12", rest: "90 sec",
        cue: "Last set to failure" }
    ]
  },
  {
    id: "lowerB",
    tab: "Lower B",
    title: "Single-Leg & Glutes",
    exercises: [
      { name: "Bulgarian Split Squat", sets: "3 x 8-10 / leg", rest: "2 min",
        cue: "Rear foot on bench, DBs at sides" },
      { name: "Dumbbell Hip Thrust", sets: "3 x 10-12", rest: "90 sec",
        cue: "1-sec glute squeeze at top" },
      { name: "Leg Extension", sets: "3 x 12-15", rest: "90 sec",
        cue: "Last set to failure" },
      { name: "Lying Leg Curl", sets: "3 x 10-12", rest: "90 sec",
        cue: "Slow negative" },
      { name: "Seated Calf Raise", sets: "4 x 12-15", rest: "60 sec",
        cue: "Pause at stretch" },
      { name: "Hanging Knee Raise", sets: "3 x 10-15", rest: "60 sec",
        cue: "Curl pelvis up. Sub decline sit-ups" }
    ]
  }
];

/* Reference text for the Notes tab.
   Each section: { title, list: [...] } and/or { title, text: "..." } */
const NOTES = [
  {
    title: "Equipment rules",
    list: [
      "Dumbbell-first. No barbells.",
      "No chest or back machines (cables and pulldowns are fine).",
      "No deadlifts from the floor.",
      "Neutral grip on anything that twinges."
    ]
  },
  {
    title: "Shoulder safety",
    list: [
      "Warm up every session, no exceptions.",
      "No dips.",
      "Press only to a comfortable depth, never a deep stretch.",
      "Pressing elbow angle ~45 degrees from torso, not flared to 90.",
      "Overhead pressing stops at ear level, neutral grip.",
      "Sharp or pinching pain (different from normal fatigue) means stop that exercise for the day."
    ]
  },
  {
    title: "Progression",
    list: [
      "Double progression: start at the bottom of each rep range, add reps until all sets hit the top, then move up a dumbbell and go back to the bottom.",
      "Most sets 1-2 reps shy of failure. Compounds always keep a rep in reserve.",
      "First 2 weeks back from a layoff: 2 sets per exercise, easy effort.",
      "Deload every ~7th week: 60% weight, 2 sets."
    ]
  },
  {
    title: "Supersets",
    text: "A1 and A2 run back-to-back with no rest between them, same for B1 and B2. Rest 90 sec after finishing the pair, then repeat."
  },
  {
    title: "Weekly schedule",
    list: [
      "Rotate Upper A, Lower A, Upper B, Lower B in order.",
      "Missed a day? Do the next session in sequence, never double up.",
      "Avoid back-to-back lower days.",
      "One full rest day weekly.",
      "Cardio: TreadClimber 20-30 min easy on 2 of the rest days."
    ]
  },
  {
    title: "Before training",
    text: "60-90 min before: light carb + protein. Banana with peanut butter, Greek yogurt with berries, dates and almonds."
  },
  {
    title: "After training",
    list: [
      "Within 45 min: protein-focused. Greek yogurt, protein shake, cottage cheese with fruit.",
      "Late training: leave 2-3 hours before bed if possible. If not, keep the post-workout snack light on caffeine."
    ]
  },
  {
    title: "Easy snacks",
    list: [
      "Cottage cheese + pineapple",
      "Hard-boiled eggs",
      "Hummus + veggies",
      "Protein smoothie",
      "Mixed nuts + dried fruit",
      "Turkey roll-ups"
    ]
  }
];
