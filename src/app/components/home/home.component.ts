import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data: any = [];

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.fetchData().subscribe((response: any) => {
      this.data = response;
      console.log(response);
    });
  }


  async confirmDelete(userId: number) {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    });

    if (result.isConfirmed) {
      this.httpService.deleteItem(userId).subscribe(() => {
        this.httpService.fetchData().subscribe((response: any) => {
          this.data = response;
          console.log(response);

        });
        Swal.fire('Deleted!', 'Your file has been deleted', 'success');
      });
    } else {
      Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
    }
  }
}
