/* =========================================================================
   WORKOUT DATA — this is the only file you need to edit to change your program.
   -------------------------------------------------------------------------
   Exercise fields:
     name     (required) exercise name
     sets     (optional) e.g. "3 x 8-10"
     rest     (optional) e.g. "90s"
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
    id: "day1",
    tab: "Day 1",
    title: "Chest + Triceps",
    exercises: [
      { name: "Dumbbell flat bench press", sets: "3 x 8-10", rest: "90s",
        cue: "Lower only to a comfortable depth, not below shoulder line", shoulder: true },
      { name: "Dumbbell incline press", sets: "2-3 x 8-10", rest: "90s",
        cue: "Same depth rule as flat press", shoulder: true },
      { name: "Dips", sets: "2-3 x 6-10", rest: "90s",
        cue: "Limit depth to ~90 degree elbow bend, lean forward slightly", shoulder: true },
      { name: "Dumbbell flyes (light)", sets: "2 x 12-15", rest: "60s",
        cue: "Slight bend in elbow, don't overstretch at the bottom" },
      { name: "Triceps pressdown or overhead extension", sets: "2-3 x 10-12", rest: "45s" },
      { name: "Face pulls", sets: "2 x 15", rest: "45s",
        cue: "Counters the pressing you just did" },
      { name: "Dumbbell external rotation", sets: "2 x 12-15 / side", rest: "45s",
        cue: "Light dumbbell only, cuff-specific", shoulder: true }
    ]
  },
  {
    id: "day2",
    tab: "Day 2",
    title: "Back + Biceps",
    exercises: [
      { name: "Chin-ups", sets: "3-4 x 6-10", rest: "90s",
        cue: "Control the descent, 2-3 sec" },
      { name: "Single-arm dumbbell row", sets: "3 x 10 / side", rest: "60s",
        cue: "Squeeze shoulder blade at top" },
      { name: "Two-arm bent-over row", sets: "3 x 8-10", rest: "90s",
        cue: "Flat back, hinge at hips" },
      { name: "Rear delt fly (light)", sets: "2 x 12-15", rest: "45s" },
      { name: "Bicep curl", sets: "2-3 x 10-12", rest: "45s" },
      { name: "Band pull-aparts or face pulls", sets: "2 x 15", rest: "45s" },
      { name: "Dumbbell external rotation", sets: "2 x 12-15 / side", rest: "45s",
        cue: "Cuff-specific, light dumbbell only", shoulder: true }
    ]
  },
  {
    id: "day3",
    tab: "Day 3",
    title: "Legs + Shoulders + Core",
    exercises: [
      { name: "Dumbbell goblet squat", sets: "3 x 8-10", rest: "90s",
        cue: "Chest up, full depth as mobility allows" },
      { name: "Dumbbell Romanian deadlift", sets: "3 x 8-10", rest: "90s",
        cue: "Slight knee bend, hinge at hips" },
      { name: "Walking lunges", sets: "2 x 10 / leg", rest: "60s" },
      { name: "Calf raise", sets: "3 x 15", rest: "45s" },
      { name: "Seated dumbbell shoulder press", sets: "2-3 x 8-10", rest: "90s",
        cue: "Stop just short of full lockout overhead. Main pressing load today", shoulder: true },
      { name: "Light dumbbell lateral raise", sets: "2 x 12-15", rest: "45s",
        cue: "Light weight only", shoulder: true },
      { name: "Dumbbell external rotation", sets: "2 x 12-15 / side", rest: "45s", shoulder: true },
      { name: "Plank / side plank", sets: "3 x 30-45s", rest: "30s" }
    ]
  }
];

/* Reference text for the Notes tab.
   Each section: { title, list: [...] } and/or { title, text: "..." } */
const NOTES = [
  {
    title: "Shoulder safety",
    list: [
      "Warm up every session, no exceptions.",
      "Dumbbells over barbells for pressing.",
      "Elbows stay above shoulder height at the bottom of presses and dips.",
      "Pressing elbow angle ~45 degrees from torso, not flared to 90.",
      "Sharp or pinching pain (different from normal fatigue) means stop that exercise for the day."
    ]
  },
  {
    title: "Weekly schedule",
    text: "Rotate Day 1 to Day 2 to Day 3, ideally with a rest day between sessions (e.g. Mon / Wed / Fri). More frequent training weeks just drift the rotation, which is fine."
  },
  {
    title: "Progression",
    list: [
      "Hit the top of a rep range with clean form for two sessions in a row, then add 2.5-5 lb per dumbbell.",
      "Cuff feels irritated: drop weight 10-20% rather than skip the movement."
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
