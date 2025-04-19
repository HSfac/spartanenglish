import { middleSchoolQuestions, highSchoolQuestions } from './testQuestions';

// 점수 계산
export const calculateScore = (
  answers: Record<number, number>,
  testType: 'middle' | 'high'
) => {
  const questions = testType === 'middle' ? middleSchoolQuestions : highSchoolQuestions;
  let correctCount = 0;
  
  questions.forEach((question) => {
    if (answers[question.id] === question.answer) {
      correctCount++;
    }
  });
  
  const totalQuestions = questions.length;
  const score = Math.round((correctCount / totalQuestions) * 100);
  
  return {
    correctCount,
    totalQuestions,
    score,
  };
};

// 영어 능력 수준 평가
export const evaluateLevel = (score: number): string => {
  if (score >= 90) {
    return '상';
  } else if (score >= 70) {
    return '중';
  } else {
    return '하';
  }
};

// 추천사항 생성
export const generateRecommendation = (
  score: number,
  testType: 'middle' | 'high'
): string => {
  const level = evaluateLevel(score);
  
  if (testType === 'middle') {
    if (level === '상') {
      return '현재 중학교 영어 수준에서 우수한 성적을 보이고 있습니다. 고급 어휘와 문법을 더 학습하고, 영어 독해 능력을 향상시키는 심화 학습이 도움이 될 것입니다.';
    } else if (level === '중') {
      return '기본적인 영어 실력은 갖추고 있으나, 일부 문법과 어휘에 대한 보완이 필요합니다. 정기적인 학습을 통해 부족한 부분을 채우는 것이 좋겠습니다.';
    } else {
      return '영어 기초를 다지는 것이 중요합니다. 기본 문법과 핵심 어휘부터 체계적으로 학습하는 것을 추천합니다.';
    }
  } else {
    if (level === '상') {
      return '고등학교 영어 수준에서 우수한 이해력을 보여주고 있습니다. 다양한 주제의 영어 지문을 읽고 비판적 사고를 기르는 것이 도움이 될 것입니다.';
    } else if (level === '중') {
      return '영어의 기본기는 있으나 고등 영어에서 요구하는 복잡한 문법과 어휘력 향상이 필요합니다. 목표 대학에 맞는 집중 학습이 필요합니다.';
    } else {
      return '고등 영어의 기초부터 체계적인 학습이 필요합니다. 기본 문법과 어휘를 재정립하고, 독해 전략을 배우는 것이 중요합니다.';
    }
  }
};

// 오답 분석
export const analyzeWrongAnswers = (
  answers: Record<number, number>,
  testType: 'middle' | 'high'
) => {
  const questions = testType === 'middle' ? middleSchoolQuestions : highSchoolQuestions;
  const wrongAnswers = questions.filter(
    (question) => answers[question.id] !== question.answer
  );
  
  return wrongAnswers.map((question) => ({
    question: question.question,
    correctAnswer: question.options[question.answer],
    userAnswer: question.options[answers[question.id]],
    explanation: question.explanation,
  }));
}; 