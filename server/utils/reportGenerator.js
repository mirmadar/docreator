const { 
  Document, 
  Packer, 
  Paragraph, 
  TextRun, 
  ImageRun,
  AlignmentType 
} = require('docx');

const generateReport = async (textData, file, subject) => {
  let titleContent;

  if (subject === 'subject1') {
    titleContent = [
      'Федеральное государственное бюджетное образовательное учреждение высшего образования',
      '«МИРЭА – Российский технологический университет»',
      'РТУ МИРЭА',
      '',
      'Институт информационных технологий (ИТ)',
      'Кафедра инструментального и прикладного программного обеспечения (ИиППО)',
      '',
      'ОТЧЕТ О ПРАКТИЧЕСКОЙ РАБОТЕ №...',
      'по теме «...»',
      'по дисциплине: «Разработка клиент-серверных приложений»'
    ];
  } else if (subject === 'subject2') {
    titleContent = [
      'Федеральное государственное бюджетное образовательное учреждение высшего образования',
      '«МИРЭА – Российский технологический университет»',
      'РТУ МИРЭА',
      '',
      'Институт информационных технологий (ИТ)',
      'Кафедра инструментального и прикладного программного обеспечения (ИиППО)',
      '',
      'ОТЧЕТ О ПРАКТИЧЕСКОЙ РАБОТЕ №...',
      'по теме «...»',
      'по дисциплине: «Технологии обработки транзакций»'
    ];
  } else {
    throw new Error('Неизвестный предмет');
  }

  const titlePageParagraphs = titleContent.map(text => new Paragraph({
    children: [
      new TextRun({
        text: text,
        bold: titleContent.indexOf(text) >= 7,
        size: 28, 
        font: 'Times New Roman',
      }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 240 },
  }));

  const titlePageSection = {
    properties: {
      page: {
        margin: {
          top: 1134,
          right: 851,
          bottom: 1134,
          left: 1701,
        },
      },
    },
    children: [
      new Paragraph({
        children: [new TextRun('')], 
        spacing: { after: 3000 }, 
      }),
      ...titlePageParagraphs,
      new Paragraph({
        children: [new TextRun('')], 
        spacing: { before: 4000 }, 
      }),
    ],
  };

  const content = [
    new Paragraph({
      children: [
        new TextRun({
          text: textData.title1 || 'Заголовок 1 отсутствует',
          bold: true,
          size: 28,
          font: 'Times New Roman',
        }),
      ],
      spacing: { line: 360 },
      indent: { firstLine: 709 },
      alignment: AlignmentType.JUSTIFIED,
    }),
    ...textData.text1.split('\n').map((paragraphText) => new Paragraph({
      children: [
        new TextRun({
          text: paragraphText,
          size: 28,
          font: "Times New Roman",
        }),
      ],
      spacing: { line: 360 },
      indent: { firstLine: 709 },
      alignment: AlignmentType.JUSTIFIED,
    })),
    file && new Paragraph({
      children: [
        new ImageRun({
          data: file.buffer,
          transformation: { width: 600, height: 400 },
        }),
      ],
      spacing: { line: 360 },
      alignment: AlignmentType.CENTER,
    }),
    file && textData.sign1 && new Paragraph({
      children: [
        new TextRun({
          text: textData.sign1,
          size: 28,
          font: 'Times New Roman',
        }),
      ],
      spacing: { after: 240 },
      alignment: AlignmentType.CENTER,
    }),
  ].filter(Boolean);

  const doc = new Document({
    sections: [
      titlePageSection,
      {
        properties: {
          page: {
            margin: {
              top: 1134,
              right: 851,
              bottom: 1134,
              left: 1701,
            },
          },
        },
        children: content,
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  return buffer;
};

module.exports = generateReport;
