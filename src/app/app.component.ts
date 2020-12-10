import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'paf4-upload-fe';
  @ViewChild('imageFile') imageFile: ElementRef
  form: FormGroup
  uploadedImgKey: any

  constructor(private fb:FormBuilder, private http: HttpClient){}

  ngOnInit(): void{
    this.form = this.fb.group({
      'image-file': this.fb.control(''),
      uploader: this.fb.control(''),
      note: this.fb.control('')
    })

  }

  upload(){
    const formData = new FormData()
    formData.set('image-file', this.imageFile.nativeElement.files[0])
    formData.set('uploader', this.form.get('uploader').value)
    formData.set('note', this.form.get('note').value)
    let params = (new HttpParams())
                  .set('uploader', this.form.get('uploader').value)
                  .set('note',this.form.get('note').value)
     this.http.post(`http://localhost:3000/upload2`, formData, {params:params})
      .toPromise()
      .then(res => {
        this.uploadedImgKey = res['key']
        console.log(res)
      })
      // .then(key => this.loadImage(key))
      .catch(e => console.log(e))
    
  }

  // loadImage(key){
  //   console.log(key)
  //   return this.http.get(`http://localhost:3000/download2/${key}`)
  //     .toPromise()
  //     .then(res=> console.log(res))
  // }
}
