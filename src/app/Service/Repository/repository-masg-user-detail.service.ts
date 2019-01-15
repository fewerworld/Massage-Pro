import { Injectable } from '@angular/core';
import { MasgUserDetail } from 'src/app/model/masg-user-detail';
import { BehaviorSubject, Subject } from 'rxjs';
import { ApiAgentService } from '../api-agent.service';
import { MasgUserService } from '../masg-user.service';

@Injectable({
  providedIn: 'root'
})
export class RepositoryMasgUserDetailService {

  // Local Data
  private masgUserDetail: MasgUserDetail;

  // Subject
  public latestMasgUserDetail: Subject<MasgUserDetail> = new BehaviorSubject<MasgUserDetail>(null);

  //
  public para: string;

  constructor(
    private masgUserService: MasgUserService,
    private apiAgentService: ApiAgentService
  ) {
    this.masgUserDetail = null;

    // ob
    this.masgUserService.latestMagUser
    .subscribe(
      masgUser => {
        if ( masgUser ) {
          this.syncUp();
        } else {
          this.clean();
        }
      }
    );

   }

  //  Clean Data
  clean(): void {
    this.masgUserDetail = null;
  }

  // Sync up Data from API Server
  syncUp(): void {
    // Direct read data from API
    this.apiAgentService.aGetWP<MasgUserDetail>('userDetial', this.masgUserService.getMasgUser().username)
    .subscribe( data => {
      this.masgUserDetail = data;
      this.latestMasgUserDetail.next(data);
    });
  }
}
