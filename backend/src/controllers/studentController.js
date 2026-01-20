import knex from "../db/knex.js";

/**
 * GET ALL QUIZZES (Student)
 */
export const getQuizzes = async (req, res) => {
  try {
    const quizzes = await knex("quizzes").select("id", "title");
    res.json(quizzes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load quizzes" });
  }
};

/**
 * GET QUIZ WITH QUESTIONS + OPTIONS
 */
export const getQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;

    const questions = await knex("questions")
      .where({ quiz_id: quizId })
      .select("id", "question_text as question");

    for (const q of questions) {
      q.options = await knex("options")
        .where({ question_id: q.id })
        .select("id", "text");
    }

    res.json({
      quizId: Number(quizId),
      questions,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load quiz" });
  }
};

/**
 * START QUIZ ATTEMPT
 */
export const startAttempt = async (req, res) => {
  try {
    const { quizId } = req.params;

    const [attemptId] = await knex("attempts").insert({
      user_id: req.user.id,
      quiz_id: quizId,
    });

    res.status(201).json({ attemptId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to start attempt" });
  }
};

/**
 * SUBMIT QUIZ ATTEMPT
 */
export const submitAttempt = async (req, res) => {
  try {
    const { attemptId } = req.params;
    const { answers } = req.body;
    // answers = [{ questionId, optionId }]

    let score = 0;

    for (const a of answers) {
      const correct = await knex("options")
        .where({ id: a.optionId, is_correct: true })
        .first();

      if (correct) score++;

      await knex("answers").insert({
        attempt_id: attemptId,
        question_id: a.questionId,
        option_id: a.optionId,
      });
    }

    await knex("attempts")
      .where({ id: attemptId })
      .update({ score });

    res.json({ score });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to submit attempt" });
  }
};

/**
 * LEADERBOARD
 */
export const leaderboard = async (req, res) => {
  try {
    const results = await knex("attempts")
      .join("users", "attempts.user_id", "users.id")
      .select("users.name", "attempts.score")
      .orderBy("attempts.score", "desc")
      .limit(10);

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load leaderboard" });
  }
};
