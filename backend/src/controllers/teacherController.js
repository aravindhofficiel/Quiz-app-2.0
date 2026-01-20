import knex from "../db/knex.js";

/**
 * CREATE QUIZ (Teacher)
 */
export const createQuiz = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const [id] = await knex("quizzes").insert({
      title,
      teacher_id: req.user.id,
    });

    res.status(201).json({ id, message: "Quiz created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create quiz" });
  }
};

/**
 * GET TEACHER QUIZZES
 */
export const getQuizzes = async (req, res) => {
  try {
    const quizzes = await knex("quizzes")
      .where({ teacher_id: req.user.id })
      .select("id", "title");

    res.json(quizzes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load quizzes" });
  }
};

/**
 * CREATE QUESTION + OPTIONS
 */
export const createQuestion = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { question, options, correctIndex } = req.body;

    if (!question || !options || correctIndex === undefined) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const quiz = await knex("quizzes")
      .where({ id: quizId, teacher_id: req.user.id })
      .first();

    if (!quiz) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const [questionId] = await knex("questions").insert({
      quiz_id: quizId,
      teacher_id: req.user.id,
      question_text: question,
    });

    const optionRows = options.map((text, index) => ({
      question_id: questionId,
      text,
      is_correct: index === correctIndex,
    }));

    await knex("options").insert(optionRows);

    res.status(201).json({ message: "Question created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create question" });
  }
};

/**
 * GET QUESTIONS FOR A QUIZ (Teacher only)
 */
export const getQuestions = async (req, res) => {
  try {
    const { quizId } = req.params;

    const questions = await knex("questions")
      .join("quizzes", "questions.quiz_id", "quizzes.id")
      .where("quizzes.teacher_id", req.user.id)
      .where("quizzes.id", quizId)
      .select(
        "questions.id",
        "questions.question_text as question"
      );

    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load questions" });
  }
};

/**
 * DELETE QUESTION
 */
export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await knex("questions")
      .join("quizzes", "questions.quiz_id", "quizzes.id")
      .where("questions.id", id)
      .where("quizzes.teacher_id", req.user.id)
      .select("questions.id")
      .first();

    if (!question) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await knex("options").where({ question_id: id }).del();
    await knex("questions").where({ id }).del();

    res.json({ message: "Question deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete question" });
  }
};
