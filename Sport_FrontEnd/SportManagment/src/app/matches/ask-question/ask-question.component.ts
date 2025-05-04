import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.css']
})
export class AskQuestionComponent {
  question: string = '';
  messages: { text: string, isUser: boolean }[] = [];
  loading: boolean = false;
  errorMessage: string = '';
  private baseUrl = 'http://localhost:8088';

  constructor(private http: HttpClient) {}

  askQuestion(): void {
    if (!this.question.trim()) {
      this.errorMessage = 'Please enter a question.';
      return;
    }

    this.messages.push({ text: this.question, isUser: true });
    this.errorMessage = '';
    this.loading = true;

    // Send GET request with question as query parameter
    const params = new HttpParams().set('question', this.question);
    this.http.get(`${this.baseUrl}/ask`, { params, responseType: 'text' }).subscribe({
      next: (response) => {
        this.messages.push({ text: response.trim(), isUser: false });
        this.loading = false;
        this.question = '';
      },
      error: (err) => {
        this.errorMessage = err.error || 'Failed to get response. Please try again.';
        this.loading = false;
        console.error('Ask question error:', err);
      }
    });
  }

  clearChat(): void {
    this.messages = [];
    this.errorMessage = '';
    this.question = '';
  }
}
