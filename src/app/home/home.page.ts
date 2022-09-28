import { Component, OnInit } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private readonly urlCode: string;
  private urlCollection: AngularFirestoreCollection<any>;
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private db: AngularFirestore
    ) {
      this.urlCollection = db.collection('urls');
      this.urlCode = this.activatedRoute.snapshot.paramMap.get('shortUrl');
    }

  async ngOnInit(): Promise<void> {
    const urlRef = this.urlCollection.ref;
    const urlsByCodeQuery = urlRef.where('code', '==', this.urlCode);
    const result = await urlsByCodeQuery.get();
    if(result != null) {
      let url = result.docs[0].get('url');
      if(url !== '') {
        url = 'https://' + url;
        window.open(url, '_self');
      }
    }
  }

}
