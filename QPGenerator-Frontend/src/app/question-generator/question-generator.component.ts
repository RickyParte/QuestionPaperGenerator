import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Question {
  question: string;
  subject: string;
  topic: String;
  difficulty: string;
  marks: number;
}

@Component({
  selector: 'app-question-generator',
  templateUrl: './question-generator.component.html',
  styleUrls: ['./question-generator.component.css']
})
export class QuestionGeneratorComponent implements OnInit {
  questions: Question[] = [];
  generatedQuestion: any =[];
  questionForm!: FormGroup;
  a = [{ name: 'ricky' }, { name: 'ricky' }];


  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.questionForm = this.formBuilder.group({
      subject: [''],
      easyPercentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      mediumPercentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      hardPercentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      totalMarks: ['', Validators.required],
    });
  }

  generateQuestion(): void {
    if (this.questionForm.valid) {
      const { subject, easyPercentage, mediumPercentage, hardPercentage, totalMarks } = this.questionForm.value;

      if(subject==''){
        this.http.post<any>('http://localhost:4000/api/generateqp/getquestionpaper', {
        difficulty: { Easy: easyPercentage, Medium: mediumPercentage, Hard: hardPercentage },
        totalMarks
      })
        .subscribe((generatedQuestion) => {
          this.generatedQuestion = generatedQuestion.data;
          console.log(this.generatedQuestion);
          this.getQuestionProperties(generatedQuestion);
        });
      }
      else{
        this.http.post<any>('http://localhost:4000/api/generateqp/getquestionpaperbysubject', {
        subject,
        difficulty: { Easy: easyPercentage, Medium: mediumPercentage, Hard: hardPercentage },
        totalMarks
      })
        .subscribe((generatedQuestion) => {
          this.generatedQuestion = generatedQuestion.data;
          console.log(this.generatedQuestion);
          this.getQuestionProperties(generatedQuestion);
        });
      }
      
    }
  }
  getQuestionProperties(question: any): { key: string, value: any }[] {
    return Object.keys(question).map(key => ({ key, value: question[key] }));
  }

}
